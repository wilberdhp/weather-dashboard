const API_KEY = import.meta.env.VITE_API_KEY;

// Buscar la ciudad por nombre
export const getCityData = async (city) => {

  try {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const data = await res.json();  

    const [ { lat, lon, name, country } ] = data;

    return { lat: lat, lon: lon, cityName: name, country: country };

  } catch {
    throw new Error("Error searching the city");
  }
}

// Buscar ciudad por latitud y longitud
export const searchCityByLocation = async (lat, long) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`);

    const data = await res.json();

    const [{ name, country }] = data;

    return { cityName: name, country: country }

  } catch {
    throw new Error("Error searching the city");
  }
}

// Datos de hoy
export const todayForecast = async (lat, lon) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await res.json();

    const { main, weather, wind } = data;
    const { feels_like, humidity, pressure, temp } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    const onlyDates = {
      feels_like: feels_like,
      humidity: humidity,
      pressure: pressure,
      temp: temp,
      image: {
        description: description,
        icon: icon
      },
      wind_speed: speed
    }

    return onlyDates;

  } catch {
    throw new Error("Error getting today's forecast"); 
  }
}

// Próximos días
export const nextDaysForecast = async (lat, lon) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    const data = await res.json();

    const uniqueDate = [];
    const forecasts = data.list.filter((forecast) => {
      const date = new Date(forecast.dt_txt).getDate();

      if (!uniqueDate.includes(date)) {
        return uniqueDate.push(date);
      }
    })

    const onlyDates = [];

    forecasts.forEach(({ dt_txt, main, weather, wind, pop }) => {
      const date = dt_txt.split(" ")[0];
      const { feels_like, humidity, pressure, temp } = main;
      const { description, icon } = weather[0];
      const { speed } = wind;

      onlyDates.push({ 
        date: date, 
        feels_like: feels_like, 
        temp: temp,
        humidity: humidity,
        pressure: pressure,
        image: {
          description: description,
          icon: icon
        },
        wind_speed: speed,
        pop: pop
      }) 
    });

    return onlyDates;

  } catch {
    throw new Error("Error getting the forecast for the next few days");
  }
} 