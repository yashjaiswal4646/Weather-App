import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';

const TemperatureToggle = ({ units, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/50 rounded-full p-1">
      <button
        onClick={() => onToggle('metric')}
        className={`flex items-center px-4 py-2 rounded-full transition-all ${
          units === 'metric' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        <FaTemperatureLow className="mr-2" />
        °C
      </button>
      <button
        onClick={() => onToggle('imperial')}
        className={`flex items-center px-4 py-2 rounded-full transition-all ${
          units === 'imperial' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        <FaTemperatureHigh className="mr-2" />
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;