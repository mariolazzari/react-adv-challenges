import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

export const WeatherContext = createContext();

function WeatherProvider({ children }) {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=London&appid=${API_KEY}`
                );
                const coordinates = await response.json();

                const { lat, lon } = coordinates[0]
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=xxx`
                );
                if (!res.ok) throw new Error('Failed to fetch weather data');
                const data = await res.json();
                setWeather({
                    name: data?.name,
                    description: data[0]?.description,
                    temp: data?.main.temp - 273.15 + "°C"
                });
                setLoading(false);
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    const value = useMemo(() => {
        return { loading, weather }
    }, [loading, weather])
    return (
        < WeatherContext.Provider value={value}>
            {children}
        </ WeatherContext.Provider>
    );
}

export const useWeatherContext = () => useContext(WeatherContext);
export default WeatherProvider;

