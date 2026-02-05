import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchBar = ({ onSearch, onLocationClick, isLoading }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    onSearch(city.trim());
    setCity('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError('');
            }}
            placeholder="Search for a city (e.g., London, New York, Tokyo)"
            className="w-full px-6 py-4 pl-14 text-lg rounded-2xl glass-card focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          
          <button
            type="button"
            onClick={onLocationClick}
            disabled={isLoading}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
            title="Use current location"
          >
            <FaMapMarkerAlt className="text-xl" />
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && (
          <p className="text-red-500 mt-2 ml-2 text-sm animate-fade-in">{error}</p>
        )}
      </form>
      
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai'].map((popularCity) => (
          <button
            key={popularCity}
            onClick={() => onSearch(popularCity)}
            disabled={isLoading}
            className="px-4 py-2 text-sm rounded-full glass-card hover:bg-white/50 transition-all hover:scale-105 disabled:opacity-50"
          >
            {popularCity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;