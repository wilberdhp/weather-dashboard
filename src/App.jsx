
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Header } from './Components/Header/Header.jsx'
import { ContainerToday } from './Components/ContainerToday/ContainerToday.jsx'
import { ContainerNextDays } from './Components/ContainerNextDays/ContainerNextDays.jsx'
import { todayForecast, nextDaysForecast, getCityData, searchCityByLocation } from './Logic/fetch.js'
import { useEffect, useState } from 'react'

function App() {

  const [cityName, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [nextDays, setNextDays] = useState([]);

  const [loadImage, setLoadImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewNextDays, setViewNextDays] = useState(false);

  // Datos de hoy
  const [feelsLike, setFeelsLike] = useState("")
  const [cityHumidity, setCityHumidity] = useState(0)
  const [cityPressure, setCityPressure] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [cityTemp, setCityTemp] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    const weatherDataSaved = window.localStorage.getItem("weather-data");
    if (weatherDataSaved === null) return;
    
    const { cityName, country, lat, lon } = JSON.parse(weatherDataSaved);
    addWeatherData(lat, lon, cityName, country)
    
  }, [])


  const addWeatherData = async (lat, lon, cityName, country) => {

    setCity(`${cityName}, ${country}`);

    // Datos de Hoy
    const weatherToday = await todayForecast(lat, lon);
    const { feels_like, humidity, pressure, temp, image, wind_speed } = weatherToday;
    const { description, icon } = image
    setFeelsLike(feels_like)
    setCityHumidity(humidity)
    setCityPressure(pressure)
    setCityTemp(temp)
    setWindSpeed(wind_speed)
    setWeatherIcon(icon)
    setImageDescription(description)

    // Datos de los próximos 5 o 6 días 
    const weatherNextDays = await nextDaysForecast(lat, lon);
    setNextDays(weatherNextDays);

    const saveLocalStorage = {
      cityName, 
      country,
      lat,
      lon
    }
    
    window.localStorage.setItem("weather-data", JSON.stringify(saveLocalStorage))
  }

  const searchWeather = async () => {
    if (!searchCity) return alert("You must enter the name of the city to know the weather");

    setLoading(true);
    try {
      // Datos de la ciudad
      const cityData = await getCityData(searchCity);
      const { lat, lon, cityName, country } = cityData;

      await addWeatherData(lat, lon, cityName, country);

    } catch {
      alert("Error getting the weather information");
      setLoading(false);
    }
  }

  const getLocation = async () => {
    setLoading(true);

    try {
      const coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        )
      });

      const { latitude, longitude } = coords;

      // Nombre de la ciudad
      const cityData = await searchCityByLocation(latitude, longitude);
      const { cityName, country } = cityData;

      await addWeatherData(latitude, longitude, cityName, country);

    } catch {
      alert("Error getting location");
      setLoading(false);
    }
  }

  const viewNextDaysFunction = (e) => {
    setViewNextDays(!viewNextDays)
    e.target.innerText = !viewNextDays ? "Not view next days" : "View next days";
  }

  const searchEnterKeyUp = () => {
    if (!searchCity) return alert("You must enter the name of the city to know the weather");
    searchWeather();
  }



  return (
    <>
      <Header
        eventChangeInput={(e) => setSearchCity(e.target.value)}
        eventSearchBtn={searchWeather}
        eventLocationBtn={getLocation}
        eventEnterKeyUp={searchEnterKeyUp}
      />

      <div className={ window.localStorage.getItem("weather-data") || window.localStorage.getItem("weather-data") && loadImage || loadImage ? "icon-front container-active" : "icon-front" }>
        <i className="bi bi-cloud-fill"></i>
        <span className='sun'></span>
        <div className={loading ? "loading" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className='container'>
        <ContainerToday
          city={cityName}
          feelsLike={feelsLike}
          humidity={cityHumidity}
          pressure={cityPressure}
          temp={cityTemp}
          windSpeed={windSpeed}
          icon={weatherIcon}
          imageDescription={imageDescription}
          active={loadImage}
          imageLoadEvent={() => setLoadImage(true)}
          eventViewNextDays={viewNextDaysFunction}
        />
        <ContainerNextDays
          active={viewNextDays}
          arrayNextDays={nextDays}
        />
      </div>
    </>
  )
}

export default App
