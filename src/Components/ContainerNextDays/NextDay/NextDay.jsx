import { Property, Temperature } from '../../Property/Property';
import './NextDayStyles.css';

export const NextDay = ({ date, icon, imageDescription, temp, humidity, pressure, feels_like, windSpeed, pop }) => {

  return (
    <div className='next-day'>
      <h3 className='next-day-date'>{date}</h3>
      <div className='icon-container'>
        {
          icon ? (<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='img' />) : ""
        }
      </div>
      
      <p className='image-description card'>{imageDescription}</p>
      <div className='info-next-day'>
        <Property card name="Temperature" value={`${temp}°C`} />
        <Property card name="Feels like" value={`${feels_like}°C`} />
        <Property card name="Humidity" value={`${humidity}%`} />
        <Property card name="Pressure" value={`${pressure}mbar`} />
        <Property card name="Wind speed" value={`${windSpeed} km/h`} />
        <Property card name="Probability of rain" value={`${pop}%`} />
      </div>
    </div>
  )
}