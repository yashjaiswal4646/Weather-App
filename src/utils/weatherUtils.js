export const getWeatherIcon = (condition, isDay = true) => {
  const icons = {
    // Clear
    '01d': '☀️',
    '01n': '🌙',
    // Few clouds
    '02d': '⛅',
    '02n': '☁️',
    // Scattered clouds
    '03d': '☁️',
    '03n': '☁️',
    // Broken clouds
    '04d': '☁️',
    '04n': '☁️',
    // Shower rain
    '09d': '🌧️',
    '09n': '🌧️',
    // Rain
    '10d': '🌦️',
    '10n': '🌧️',
    // Thunderstorm
    '11d': '⛈️',
    '11n': '⛈️',
    // Snow
    '13d': '❄️',
    '13n': '❄️',
    // Mist
    '50d': '🌫️',
    '50n': '🌫️',
  };
  
  return icons[condition] || '🌈';
};

export const getWeatherBackground = (condition) => {
  const backgrounds = {
    '01d': 'from-yellow-300 to-orange-400', // Clear day
    '01n': 'from-indigo-900 to-purple-900', // Clear night
    '02d': 'from-blue-300 to-gray-400', // Few clouds day
    '02n': 'from-gray-800 to-gray-900', // Few clouds night
    '03d': 'from-gray-300 to-gray-500', // Scattered clouds
    '03n': 'from-gray-800 to-gray-900',
    '04d': 'from-gray-400 to-gray-600', // Broken clouds
    '04n': 'from-gray-900 to-black',
    '09d': 'from-blue-400 to-gray-500', // Shower rain
    '09n': 'from-blue-900 to-gray-900',
    '10d': 'from-blue-300 to-gray-400', // Rain
    '10n': 'from-blue-800 to-gray-900',
    '11d': 'from-purple-400 to-gray-600', // Thunderstorm
    '11n': 'from-purple-900 to-black',
    '13d': 'from-blue-100 to-gray-300', // Snow
    '13n': 'from-blue-900 to-gray-800',
    '50d': 'from-gray-200 to-gray-400', // Mist
    '50n': 'from-gray-800 to-gray-900',
  };
  
  return backgrounds[condition] || 'from-blue-400 to-cyan-400';
};

export const formatTemperature = (temp, units) => {
  return units === 'metric' 
    ? `${Math.round(temp)}°C` 
    : `${Math.round(temp)}°F`;
};

export const formatWindSpeed = (speed, units) => {
  return units === 'metric' 
    ? `${Math.round(speed)} km/h` 
    : `${Math.round(speed * 2.237)} mph`;
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};