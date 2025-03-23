import './HeaderStyles.css';

export const Header = ({ eventChangeInput, eventSearchBtn, eventLocationBtn, eventEnterKeyUp }) => {

  const handleChange = (e) => {
    eventChangeInput(e);
  }

  const handleClickSearch = (e) => {
    e.preventDefault();
    eventSearchBtn(e);
  }

  const handleClickLocation = (e) => {
    e.preventDefault();
    eventLocationBtn(e)
  }

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      eventEnterKeyUp(e);
    }
  }

  return (
    <header className='navbar-container'>
      <h1>Weather Dashboard</h1>
      <div className='search-section'>
        <div className='search-container'>
          <label>
            <input onKeyUp={handleKeyUp} onChange={handleChange} placeholder='E.g., London, Toronto, or Paris' className='search-input' type='search' />
          </label>
          <button type='button' onClick={handleClickSearch} className='btn btn-search'>
            <i className="bi bi-search"></i>
          </button>
        </div>
        <button onClick={handleClickLocation} className='btn btn-location'>
          <i className="bi bi-geo-alt-fill"></i>
        </button>
      </div>
    </header>
  )
}