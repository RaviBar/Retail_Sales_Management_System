import { useSales } from '../context/SalesContext';

const SortDropdown = () => {
  const { sortBy, sortOrder, updateSort } = useSales();

  const sortOptions = [
    { value: 'date', label: 'Date (Newest First)', defaultOrder: 'desc' },
    { value: 'quantity', label: 'Quantity', defaultOrder: 'desc' },
    { value: 'customerName', label: 'Customer Name (A-Z)', defaultOrder: 'asc' }
  ];

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    const selectedOption = sortOptions.find(opt => opt.value === newSortBy);
    const newSortOrder = selectedOption ? selectedOption.defaultOrder : 'desc';
    updateSort(newSortBy, newSortOrder);
  };

  const handleOrderChange = (e) => {
    updateSort(sortBy, e.target.value);
  };

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Customer Name (A-Z)';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 font-medium">Sort by:</span>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="px-4 py-2 bg-[#F3F3F3] text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {sortBy !== 'date' && (
        <select
          value={sortOrder}
          onChange={handleOrderChange}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      )}
    </div>
  );
};

export default SortDropdown;



