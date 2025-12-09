export const buildQueryParams = (state) => {
  const params = {};
  
  if (state.search) {
    params.search = state.search;
  }
  
  if (state.filters.region?.length > 0) {
    params.region = state.filters.region;
  }
  
  if (state.filters.gender?.length > 0) {
    params.gender = state.filters.gender;
  }
  
  if (state.filters.ageMin !== null && state.filters.ageMin !== undefined) {
    params.ageMin = state.filters.ageMin;
  }
  
  if (state.filters.ageMax !== null && state.filters.ageMax !== undefined) {
    params.ageMax = state.filters.ageMax;
  }
  
  if (state.filters.category?.length > 0) {
    params.category = state.filters.category;
  }
  
  if (state.filters.tags?.length > 0) {
    params.tags = state.filters.tags;
  }
  
  if (state.filters.paymentMethod?.length > 0) {
    params.paymentMethod = state.filters.paymentMethod;
  }
  
  if (state.filters.dateFrom) {
    params.dateFrom = state.filters.dateFrom;
  }
  
  if (state.filters.dateTo) {
    params.dateTo = state.filters.dateTo;
  }
  
  if (state.sortBy) {
    params.sortBy = state.sortBy;
  }
  
  if (state.sortOrder) {
    params.sortOrder = state.sortOrder;
  }
  
  if (state.page) {
    params.page = state.page;
  }
  
  if (state.limit) {
    params.limit = state.limit;
  }
  
  return params;
};



