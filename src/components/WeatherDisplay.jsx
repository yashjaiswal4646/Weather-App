import { 
  formatTemperature, 
  formatWindSpeed, 
  getWindDirection,
  formatDate,
  formatTime 
} from '../utils/weatherUtils';
import WeatherIcon from './WeatherIcon';
import { FaThermometerHalf, FaTint, FaWind, FaEye, FaCloud, FaCompass } from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';

const WeatherDisplay = ({ weatherData, units }) => {
  if (!weatherData) return null;

  const { name, sys, main, weather, wind, visibility, clouds, dt } = weatherData;
  
  const sunriseTime = formatTime(sys.sunrise);
  const sunsetTime = formatTime(sys.sunset);
  const currentTime = formatTime(dt);

  const weatherStats = [
    {
      icon: <FaThermometerHalf className="text-blue-500" />,
      label: 'Feels Like',
      value: formatTemperature(main.feels_like, units),
      color: 'text-blue-600',
    },
    {
      icon: <FaTint className="text-blue-400" />,
      label: 'Humidity',
      value: `${main.humidity}%`,
      color: 'text-blue-500',
    },
    {
      icon: <FaWind className="text-green-500" />,
      label: 'Wind Speed',
      value: formatWindSpeed(wind.speed, units),
      color: 'text-green-600',
    },
    {
      icon: <FaEye className="text-purple-500" />,
      label: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      color: 'text-purple-600',
    },
    {
      icon: <FaCloud className="text-gray-500" />,
      label: 'Cloudiness',
      value: `${clouds.all}%`,
      color: 'text-gray-600',
    },
    {
      icon: <FaCompass className="text-orange-500" />,
      label: 'Wind Direction',
      value: getWindDirection(wind.deg),
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Main Weather Card */}
      <div className="weather-card mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {name}, {sys.country}
              </h1>
              <p className="text-gray-600 mt-1">
                {formatDate(dt)} • {currentTime}
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <WeatherIcon condition={weather[0].icon} size="xlarge" />
              
              <div>
                <p className="text-6xl font-bold text-gray-800 mb-2">
                  {formatTemperature(main.temp, units)}
                </p>
                <p className="text-2xl text-gray-600 capitalize">
                  {weather[0].description}
                </p>
                <div className="flex items-center space-x-4 mt-3 text-gray-500">
                  <span>H: {formatTemperature(main.temp_max, units)}</span>
                  <span>L: {formatTemperature(main.temp_min, units)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sunrise/Sunset */}
          <div className="mt-6 md:mt-0 md:ml-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 min-w-[200px]">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <WiSunrise className="text-2xl mr-2 text-orange-500" />
              Sun Times
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sunrise</span>
                <span className="font-semibold text-gray-800">{sunriseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sunset</span>
                <span className="font-semibold text-gray-800">{sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {weatherStats.map((stat, index) => (
          <div
            key={index}
            className="weather-card text-center p-4 hover:scale-105 transition-transform"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="weather-card">
          <h3 className="font-semibold text-gray-700 mb-4">Pressure & Sea Level</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="text-xl font-bold text-blue-600">{main.pressure} hPa</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-500">Sea Level</p>
              <p className="text-xl font-bold text-blue-600">{main.sea_level || 'N/A'} hPa</p>
            </div>
          </div>
        </div>
        
        <div className="weather-card">
          <h3 className="font-semibold text-gray-700 mb-4">Coordinates</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Latitude</span>
              <span className="font-bold text-gray-800">{weatherData.coord.lat.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Longitude</span>
              <span className="font-bold text-gray-800">{weatherData.coord.lon.toFixed(2)}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;