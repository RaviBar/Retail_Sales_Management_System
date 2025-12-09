import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSalesData, getFilterOptions } from '../services/salesService';

const SalesContext = createContext();

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within SalesProvider');
  }
  return context;
};

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filter state
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageMin: null,
    ageMax: null,
    category: [],
    tags: [],
    paymentMethod: [],
    dateFrom: null,
    dateTo: null
  });
  
  // Sort state
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
    tags: []
  });

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch sales data
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        search: search || undefined,
        region: filters.region.length > 0 ? filters.region : undefined,
        gender: filters.gender.length > 0 ? filters.gender : undefined,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        category: filters.category.length > 0 ? filters.category : undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined,
        paymentMethod: filters.paymentMethod.length > 0 ? filters.paymentMethod : undefined,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
        sortBy,
        sortOrder,
        page,
        limit
      };

      const result = await getSalesData(params);
      setSales(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch sales data');
      setSales([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [search, filters, sortBy, sortOrder, page, limit]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Reset to page 1 when filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [search, filters, sortBy, sortOrder]);

  const updateSearch = (value) => {
    setSearch(value);
  };

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      region: [],
      gender: [],
      ageMin: null,
      ageMax: null,
      category: [],
      tags: [],
      paymentMethod: [],
      dateFrom: null,
      dateTo: null
    });
    setSearch('');
  };

  const updateSort = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const goToPage = (newPage) => {
    setPage(newPage);
  };

  const value = {
    sales,
    loading,
    error,
    total,
    totalPages,
    page,
    limit,
    search,
    filters,
    sortBy,
    sortOrder,
    filterOptions,
    updateSearch,
    updateFilter,
    clearFilters,
    updateSort,
    goToPage,
    refresh: fetchSales
  };

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
};



