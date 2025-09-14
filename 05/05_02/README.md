# 🌦️ Weather Dashboard with OpenWeatherMap API

This project demonstrates how to fetch and display live weather data using the [OpenWeatherMap API](https://openweathermap.org/current) in a React application.

## 🔑 Step 1: Get an API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up and generate your API key.
3. Copy your API key for use in the project.

---

## 🛠️ Step 2: Setup Environment Variables

Create a `.env` file in the root of your project and add the following:

### For Vite:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

## 🌐 Step 3: Make a API Call

```js
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // or process.env.REACT_APP_WEATHER_API_KEY for CRA

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const lat = 48.85; // example latitude (Paris)
    const lon = 2.35;  // example longitude

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const temperature = kelvinToCelsius(data.main.temp);
        setWeather({
          city: data.name,
          temp: temperature,
          description: data.weather[0].description,
        });
      })
      .catch(err => console.error('Error fetching weather:', err));
  }, []);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div>
      <h3>Weather in {weather.city}</h3>
      <p>{weather.temp}°C - {weather.description}</p>
    </div>
  );
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

```