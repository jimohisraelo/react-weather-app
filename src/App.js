import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [lastValidWeatherData, setLastValidWeatherData] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        alert(`City "${city}" not found.`);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setLastValidWeatherData(data);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert("Network error. Please try again.");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png";
      case "Rain":
        return "/rain_with_cloud.png";
      case "Mist":
        return "/Tornado.png";
      case "Haze":
        return "/sun.png";
      default:
        return "/default-weather-icon.png";
    }
  };

  const displayData = weatherData || lastValidWeatherData;

  return (
    <div className="App">
      <div className="container">
        {displayData ? (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{displayData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(displayData.weather[0].main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">
                {displayData.main.temp}°C
              </h2>
              <h2 className="country_per">
                {displayData.weather[0].main}
              </h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </>
        ) : (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '40%' }}>
            Loading weather data...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
