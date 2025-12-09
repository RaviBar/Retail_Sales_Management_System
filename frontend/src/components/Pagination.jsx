import { useSales } from '../context/SalesContext';

const Pagination = () => {
  const { page, totalPages, goToPage } = useSales();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      goToPage(newPage);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = page - 2; i <= page + 3; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1">
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            pageNum === page
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
          aria-label={`Go to page ${pageNum}`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;



