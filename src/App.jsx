import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastCard from './components/ForecastCard';
import TemperatureToggle from './components/TemperatureToggle';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData, fetchWeatherByCoords } from './utils/api';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [units, setUnits] = useState('metric');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchData = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherData(city, units),
        fetchForecastData(city, units)
      ]);
      
      setWeatherData(weather);
      
      // Filter forecast to show one per day (every 8th item = 24 hours)
      const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      setForecastData(dailyForecast);
      
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weather = await fetchWeatherByCoords(latitude, longitude, units);
            setWeatherData(weather);
            setError('');
            setLastUpdated(new Date().toLocaleTimeString());
          } catch (err) {
            setError('Failed to get location weather. Please try searching instead.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Please enable location access or search for a city.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    // Default city on first load
    fetchData('London');
  }, [units]);

  const handleUnitsToggle = (newUnits) => {
    if (newUnits !== units) {
      setUnits(newUnits);
      if (weatherData) {
        fetchData(weatherData.name);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl">
                <WiDaySunny className="text-3xl text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Weather<span className="text-blue-600">App</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <TemperatureToggle units={units} onToggle={handleUnitsToggle} />
              
              {lastUpdated && (
                <div className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                  Updated: {lastUpdated}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-lg">
            Get real-time weather updates for any city worldwide
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar 
          onSearch={fetchData} 
          onLocationClick={handleLocationClick}
          isLoading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-center animate-slide-up">
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-1">Please try another city or check your internet connection.</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          /* Weather Content */
          weatherData && (
            <>
              {/* Current Weather */}
              <WeatherDisplay weatherData={weatherData} units={units} />
              
              {/* 5-Day Forecast */}
              {forecastData.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <WiCloudy className="text-3xl mr-2 text-blue-500" />
                      5-Day Forecast
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <WiRain className="text-lg" />
                      <span>Rain</span>
                      <WiSnow className="text-lg ml-2" />
                      <span>Snow</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecastData.map((day, index) => (
                      <ForecastCard 
                        key={index} 
                        forecast={day} 
                        units={units} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Info */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                  <p>
                    Data provided by{' '}
                    <a 
                      href="https://openweathermap.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      OpenWeatherMap
                    </a>
                  </p>
                  <p className="mt-2 md:mt-0">
                    Units: {units === 'metric' ? 'Celsius, km/h' : 'Fahrenheit, mph'}
                  </p>
                </div>
              </div>
            </>
          )
        )}

        {/* Empty State */}
        {!loading && !weatherData && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌤️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Weather Data
            </h3>
            <p className="text-gray-500">
              Search for a city to see weather information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;