import { formatDate, formatTemperature } from '../utils/weatherUtils';
import WeatherIcon from './WeatherIcon';

const ForecastCard = ({ forecast, units }) => {
  return (
    <div className="weather-card hover:scale-[1.02] transition-transform">
      <div className="flex flex-col items-center text-center">
        <p className="font-semibold text-gray-700 mb-2">
          {formatDate(forecast.dt).split(',')[0]}
        </p>
        <p className="text-sm text-gray-500 mb-3">
          {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
        
        <WeatherIcon condition={forecast.weather[0].icon} size="medium" />
        
        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-800">
            {formatTemperature(forecast.main.temp, units)}
          </p>
          <p className="text-sm text-gray-600 capitalize mt-1">
            {forecast.weather[0].description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm w-full">
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <span>🌡️</span>
            <span>H: {formatTemperature(forecast.main.temp_max, units)}</span>
          </div>
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <span>🌡️</span>
            <span>L: {formatTemperature(forecast.main.temp_min, units)}</span>
          </div>
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <span>💧</span>
            <span>{forecast.main.humidity}%</span>
          </div>
          <div className="flex items-center justify-center space-x-1 text-gray-600">
            <span>💨</span>
            <span>{Math.round(forecast.wind.speed)} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;