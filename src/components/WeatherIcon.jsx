import { getWeatherIcon, getWeatherBackground } from '../utils/weatherUtils';

const WeatherIcon = ({ condition, size = 'large' }) => {
  const icon = getWeatherIcon(condition);
  const bgClass = getWeatherBackground(condition);
  
  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-16 h-16 text-3xl',
    large: 'w-24 h-24 text-5xl',
    xlarge: 'w-32 h-32 text-6xl',
  };
  
  return (
    <div className={`flex items-center justify-center rounded-full bg-gradient-to-br ${bgClass} ${sizeClasses[size]} shadow-lg`}>
      <span>{icon}</span>
    </div>
  );
};

export default WeatherIcon;