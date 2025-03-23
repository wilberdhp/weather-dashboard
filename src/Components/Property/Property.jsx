import './PropertyStyles.css'

export const Temperature = ({ max, min }) => {
  return (
    <div className='item'>
      <span className='item-name'>Temperature</span>
      {
        max === min ? (
          <div>
            <span className='item-value'>{max}°C</span>
          </div>
        ) : (
          <div>
            <span className='item-value'>{max}°C</span> / <span className='item-value'>{min}°C</span>
          </div>
        )
      }
    </div>
  )
}

export const Property = ({ name, value, card }) => {
  return (
    <div className={card ? 'item card' : 'item'}>
      <span className='item-name'>{name}</span>
      <span className='item-value'>{value}</span>
    </div>
  )

}


