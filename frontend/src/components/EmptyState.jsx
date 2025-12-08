import { useSales } from '../context/SalesContext';

const EmptyState = () => {
  const { clearFilters } = useSales();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">📭</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button
        onClick={clearFilters}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;



