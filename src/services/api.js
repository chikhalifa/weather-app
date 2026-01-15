
// Map WMO Weather Codes to descriptions and icon names
export const getWeatherCodeInfo = (code) => {
    const codes = {
        0: { label: 'Clear Sky', icon: 'Sun', gradient: 'var(--gradient-sunny)' },
        1: { label: 'Mainly Clear', icon: 'CloudSun', gradient: 'var(--gradient-sunny)' },
        2: { label: 'Partly Cloudy', icon: 'Cloud', gradient: 'var(--gradient-cloudy)' },
        3: { label: 'Overcast', icon: 'CloudFog', gradient: 'var(--gradient-cloudy)' },
        45: { label: 'Fog', icon: 'CloudFog', gradient: 'var(--gradient-cloudy)' },
        48: { label: 'Depositing Rime Fog', icon: 'CloudFog', gradient: 'var(--gradient-cloudy)' },
        51: { label: 'Light Drizzle', icon: 'CloudDrizzle', gradient: 'var(--gradient-rainy)' },
        53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle', gradient: 'var(--gradient-rainy)' },
        55: { label: 'Dense Drizzle', icon: 'CloudDrizzle', gradient: 'var(--gradient-rainy)' },
        61: { label: 'Slight Rain', icon: 'CloudRain', gradient: 'var(--gradient-rainy)' },
        63: { label: 'Moderate Rain', icon: 'CloudRain', gradient: 'var(--gradient-rainy)' },
        65: { label: 'Heavy Rain', icon: 'CloudRain', gradient: 'var(--gradient-rainy)' },
        71: { label: 'Slight Snow', icon: 'Snowflake', gradient: 'var(--gradient-rainy)' },
        73: { label: 'Moderate Snow', icon: 'Snowflake', gradient: 'var(--gradient-rainy)' },
        75: { label: 'Heavy Snow', icon: 'Snowflake', gradient: 'var(--gradient-rainy)' },
        80: { label: 'Slight Showers', icon: 'CloudRain', gradient: 'var(--gradient-rainy)' },
        81: { label: 'Moderate Showers', icon: 'CloudRain', gradient: 'var(--gradient-rainy)' },
        82: { label: 'Violent Showers', icon: 'CloudLightning', gradient: 'var(--gradient-rainy)' },
        95: { label: 'Thunderstorm', icon: 'CloudLightning', gradient: 'var(--gradient-rainy)' },
    };

    return codes[code] || { label: 'Unknown', icon: 'HelpCircle', gradient: 'var(--gradient-default)' };
};

export const searchCity = async (query) => {
    if (!query) return [];
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching city:", error);
        throw error;
    }
};

export const getWeather = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};
