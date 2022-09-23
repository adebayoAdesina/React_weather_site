import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setinput] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&aqi=no`
      )
      .then((data) => setWeather(data.data))
      .catch((e) => console.log(e));
  }, []);

  const weatherInput = (e) => {
    setinput(e.target.value);
  };

  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&aqi=no`
      )
      .then((data) => setWeather(data.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <div className="search">
        <h2 className="header">WEATHER APP</h2>
        <input type="text" onChange={weatherInput} className='border-none py-2 py-3'/>
        <button type="submit" onClick={searchWeather} className="btn btn-primary">
          Search
        </button>
      </div>
      {weather && (
        <div>
          <div className="weather-info"></div>
          <h1>{weather.location.name}</h1>
          <h2>{weather.location.region}</h2>
          <div className="condition">
            <h3>{weather.current.condition.text}</h3>
            <img src={weather.current.condition.icon} alt="" />
            <h3>{weather.current.temp_c}Celsius</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
