import { useState, useEffect } from 'react';
import { getWeather } from '../services/api';

export const useWeather = (location) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getWeather(location.latitude, location.longitude);
                setWeatherData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return { weatherData, loading, error };
};
