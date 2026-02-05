const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

export const fetchForecastData = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
};

export const fetchWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};