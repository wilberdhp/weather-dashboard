import './ContainerNextDaysStyles.css';
import { NextDay } from './NextDay/NextDay';

export const ContainerNextDays = ({ arrayNextDays, active}) => {

  const className = active ? "container-next-days active" : "container-next-days";

  return (
    <div className={className}>

      {
        arrayNextDays.map(({ date, feels_like, temp, humidity, pressure, image, wind_speed, pop }, index) => (
          <NextDay 
            key={index}
            date={date}
            icon={image.icon}
            imageDescription={image.description}
            temp={temp}
            feels_like={feels_like}
            humidity={humidity}
            pressure={pressure}
            windSpeed={wind_speed}
            pop={pop}
          />
        ))
      }
    </div>
  )
}