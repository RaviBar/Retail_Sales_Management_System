import { useState } from 'react';
import { useSales } from '../context/SalesContext';

const FilterDropdowns = () => {
  const { filters, filterOptions, updateFilter, refresh } = useSales();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleFilterChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFilter(filterName, newValues);
  };

  const getFilterLabel = (filterName) => {
    const labels = {
      region: 'Customer Region',
      gender: 'Gender',
      category: 'Product Category',
      tags: 'Tags',
      paymentMethod: 'Payment Method',
      date: 'Date'
    };
    return labels[filterName] || filterName;
  };

  const getActiveCount = (filterName) => {
    if (filterName === 'date') {
      return (filters.dateFrom || filters.dateTo) ? 1 : 0;
    }
    if (filterName === 'ageRange') {
      return (filters.ageMin !== null && filters.ageMin !== undefined) || (filters.ageMax !== null && filters.ageMax !== undefined) ? 1 : 0;
    }
    return (filters[filterName]?.length || 0);
  };

  const renderDropdownContent = (filterName) => {
    switch (filterName) {
      case 'region':
        return (
          <div className="p-2 max-h-64 overflow-y-auto">
            {filterOptions.regions.map(region => (
              <label key={region} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.region?.includes(region) || false}
                  onChange={() => handleFilterChange('region', region)}
                  className="rounded"
                />
                <span className="text-sm">{region}</span>
              </label>
            ))}
          </div>
        );
      case 'gender':
        return (
          <div className="p-2 max-h-64 overflow-y-auto">
            {filterOptions.genders.map(gender => (
              <label key={gender} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.gender?.includes(gender) || false}
                  onChange={() => handleFilterChange('gender', gender)}
                  className="rounded"
                />
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        );
      case 'category':
        return (
          <div className="p-2 max-h-64 overflow-y-auto">
            {filterOptions.categories.map(category => (
              <label key={category} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category?.includes(category) || false}
                  onChange={() => handleFilterChange('category', category)}
                  className="rounded"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        );
      case 'tags':
        return (
          <div className="p-2 max-h-64 overflow-y-auto">
            {filterOptions.tags.slice(0, 20).map(tag => (
              <label key={tag} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.tags?.includes(tag) || false}
                  onChange={() => handleFilterChange('tags', tag)}
                  className="rounded"
                />
                <span className="text-sm">{tag}</span>
              </label>
            ))}
          </div>
        );
      case 'paymentMethod':
        return (
          <div className="p-2 max-h-64 overflow-y-auto">
            {filterOptions.paymentMethods.map(method => (
              <label key={method} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.paymentMethod?.includes(method) || false}
                  onChange={() => handleFilterChange('paymentMethod', method)}
                  className="rounded"
                />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
        );
      case 'date':
        return (
          <div className="p-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const filterItems = [
    { key: 'region', label: 'Customer Region' },
    { key: 'gender', label: 'Gender' },
    { key: 'ageRange', label: 'Age Range' },
    { key: 'category', label: 'Product Category' },
    { key: 'tags', label: 'Tags' },
    { key: 'paymentMethod', label: 'Payment Method' },
    { key: 'date', label: 'Date' }
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={refresh}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Refresh"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {filterItems.map(({ key, label }) => (
        <div key={key} className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F3F3F3] rounded-md hover:bg-gray-50 transition-colors text-[14px] font-medium text-gray-700"          >
            <span>{label}</span>
            {getActiveCount(key) > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {getActiveCount(key)}
              </span>
            )}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openDropdown === key && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenDropdown(null)}
              ></div>
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                {key === 'ageRange' ? (
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.ageMin || ''}
                          onChange={(e) => updateFilter('ageMin', e.target.value ? parseInt(e.target.value) : null)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.ageMax || ''}
                          onChange={(e) => updateFilter('ageMax', e.target.value ? parseInt(e.target.value) : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  renderDropdownContent(key)
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterDropdowns;

