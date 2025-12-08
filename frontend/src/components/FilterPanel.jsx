import { useSales } from '../context/SalesContext';
import './FilterPanel.css';

const FilterPanel = () => {
  const { filters, filterOptions, updateFilter, clearFilters } = useSales();

  const handleMultiSelect = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFilter(filterName, newValues);
  };

  const handleRange = (filterName, value) => {
    updateFilter(filterName, value ? parseInt(value) : null);
  };

  const handleDateRange = (filterName, value) => {
    updateFilter(filterName, value || null);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.region?.length > 0) count++;
    if (filters.gender?.length > 0) count++;
    if (filters.ageMin !== null || filters.ageMax !== null) count++;
    if (filters.category?.length > 0) count++;
    if (filters.tags?.length > 0) count++;
    if (filters.paymentMethod?.length > 0) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="clear-all-btn">
            Clear All ({activeCount})
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3>Customer Region</h3>
        <div className="filter-options">
          {filterOptions.regions.map(region => (
            <label key={region} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.region?.includes(region) || false}
                onChange={() => handleMultiSelect('region', region)}
              />
              <span>{region}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Gender</h3>
        <div className="filter-options">
          {filterOptions.genders.map(gender => (
            <label key={gender} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.gender?.includes(gender) || false}
                onChange={() => handleMultiSelect('gender', gender)}
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Age Range</h3>
        <div className="filter-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin || ''}
            onChange={(e) => handleRange('ageMin', e.target.value)}
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax || ''}
            onChange={(e) => handleRange('ageMax', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Product Category</h3>
        <div className="filter-options">
          {filterOptions.categories.map(category => (
            <label key={category} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.category?.includes(category) || false}
                onChange={() => handleMultiSelect('category', category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Tags</h3>
        <div className="filter-options">
          {filterOptions.tags.slice(0, 20).map(tag => (
            <label key={tag} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.tags?.includes(tag) || false}
                onChange={() => handleMultiSelect('tags', tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Payment Method</h3>
        <div className="filter-options">
          {filterOptions.paymentMethods.map(method => (
            <label key={method} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.paymentMethod?.includes(method) || false}
                onChange={() => handleMultiSelect('paymentMethod', method)}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Date Range</h3>
        <div className="filter-date-range">
          <label>
            From:
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleDateRange('dateFrom', e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleDateRange('dateTo', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;



