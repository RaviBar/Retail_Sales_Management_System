import api from './api';

export const getSalesData = async (params) => {
  try {
    // Build query string
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          // For arrays, add multiple params or comma-separated
          value.forEach(v => queryParams.append(key, v));
        } else if (!Array.isArray(value)) {
          queryParams.append(key, value);
        }
      }
    });

    const response = await api.get(`/api/sales?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    const response = await api.get('/api/sales/filter-options');
    return response.data;
  } catch (error) {
    throw error;
  }
};



