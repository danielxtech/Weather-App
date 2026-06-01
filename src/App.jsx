import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "c0213f8f95e4ac2e4c1249dde844cfae";

  const cities = [
    "Beirut",
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Dubai",
    "Istanbul",
    "Rome",
    "Berlin",
    "Moscow",
    "Toronto",
    "Sydney"
  ];

  const fetchWeather = async (selectedCity) => {

    const cityName = selectedCity || city;

    if (!cityName) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="weather-container">

        <h1> 🌤️Weather App</h1>

        {/* Search */}
        <div className="search-box">

          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={() => fetchWeather()}>
            Search
          </button>

        </div>

        {/* City Buttons */}
        <div className="city-buttons">

          {cities.map((cityName, index) => (
            <button
              key={index}
              className="city-btn"
              onClick={() => fetchWeather(cityName)}
            >
              {cityName}
            </button>
          ))}

        </div>

        {/* Loading */}
        {loading && <p className="loading">Loading...</p>}

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Weather Card */}
        {weatherData && (

          <div className="weather-card">

            <h2>
              📍 {weatherData.name}
            </h2>

            <div className="temp">
              {Math.round(weatherData.main.temp)}°C
            </div>

            <p className="description">
              {weatherData.weather[0].description}
            </p>

            <div className="weather-info">

              <div>
                💧 Humidity
                <span>{weatherData.main.humidity}%</span>
              </div>

              <div>
                🌬 Wind
                <span>{weatherData.wind.speed} m/s</span>
              </div>

              <div>
                🌡 Feels Like
                <span>{Math.round(weatherData.main.feels_like)}°C</span>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;