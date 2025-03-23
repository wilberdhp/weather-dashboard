import { Property } from '../Property/Property';
import './ContainerTodayStyles.css';

export const ContainerToday = ({ feelsLike, humidity, pressure, windSpeed, temp, icon, imageDescription, city, eventViewNextDays, imageLoadEvent, active }) => {

  const className = active ? "container-today active" : "container-today";

  const handleClick = (e) => {
    e.preventDefault();
    eventViewNextDays(e);
  }

  const handleLoad = (e) => {
    imageLoadEvent(e)
  }

  return (
    <div className={className}>
      <div className='principal-info'>
        {
          temp ? (<h2>{Math.floor(temp)}<span>° C</span></h2>) : ""
        }
        <div className='img-container'>
          {
            icon ? (<img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt='img' onLoad={handleLoad} />) : ""
          }
          
        </div>
        <p className='image-description'>{imageDescription}</p>

        <p className='name-country'>
          <i className="bi bi-geo-alt-fill"></i>
          {city}
        </p>
      </div>

      <div className='container-info'>
        <div className='info'>
          <Property name="Feels like" value={`${feelsLike}°C`} />
          <Property name="Humidity" value={`${humidity}%`} />
          <Property name="Pressure" value={`${pressure}mbar`} />
          <Property name="Wind speed" value={`${windSpeed} km/h`} />
        </div>

        <button onClick={handleClick}>View next days</button>
      </div>
    </div>
  )
}