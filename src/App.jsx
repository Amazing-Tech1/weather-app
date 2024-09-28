import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import wind from './assets/wind.png'
import humidity from './assets/humidity.png'

function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  async function search() {
    if (city === "") {
      alert("Pls Enter City Name")
      return;
    }
    try {
      setIsLoading(true)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description
      })
    } catch (error) {
      setError("city not found")
    } finally { setIsLoading(false) }
  }
  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      search();
      setSubmitted(true)
    }
  }
  function handleInputChange(e) {
    setCity(e.target.value)
    if (e.target.value === "") {
      setWeatherData()
      setSubmitted(false)
    }
  }

  return (
    <div className="app">
      <div className="weather-app">
        <div className="search-box">
          <input type="text" placeholder='Enter city Name...' value={city} onChange={(e) => handleInputChange(e)} onKeyDown={handleOnKeyDown} />
        </div>
        {
          isLoading && (
            <Oval size={20} />
          )
        }

        {!isLoading && error && <p>{error}</p>}

        {submitted && weatherData && (
          <>
            <div className="main">
              <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.description} className='weather-img' />
              <p> {weatherData.description} </p>
            </div>
            <p className='temp'>{weatherData.temperature}℃</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind} alt="" />
                <div>
                  <p>{weatherData.windSpeed} km/h </p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )
        }
      </div>
    </div>
  )
}

export default App
