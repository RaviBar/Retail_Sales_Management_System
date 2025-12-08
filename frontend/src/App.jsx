import { SalesProvider } from './context/SalesContext';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterDropdowns from './components/FilterDropdowns';
import SortDropdown from './components/SortDropdown';
import SummaryCards from './components/SummaryCards';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';

function App() {
  return (
    <SalesProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>
              <div className="w-80">
                <SearchBar />
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Filters and SortDropdown in a row */}
            <div className="flex items-center gap-4 mb-4">
              <FilterDropdowns />
              <SortDropdown />
            </div>
            {/* Summary cards row */}
            <div className="flex gap-3 mb-4">
              <SummaryCards />
            </div>
            {/* Table with horizontal scroll */}
            <div className="table-container">
              <SalesTable />
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </SalesProvider>
  );
}

export default App;