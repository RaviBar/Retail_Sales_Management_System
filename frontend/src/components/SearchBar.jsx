import { useState, useEffect } from 'react';
import { useSales } from '../context/SalesContext';

const SearchBar = () => {
  const { search, updateSearch } = useSales();
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, updateSearch]);

  const handleChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleClear = () => {
    setLocalSearch('');
    updateSearch('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Name, Phone no."
        value={localSearch}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 bg-[#F3F3F3] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;



