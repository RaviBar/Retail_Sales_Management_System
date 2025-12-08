export const validateQueryParams = (query) => {
  const errors = [];

  // Validate age range
  if (query.ageMin !== undefined && query.ageMax !== undefined) {
    const ageMin = parseInt(query.ageMin);
    const ageMax = parseInt(query.ageMax);
    if (isNaN(ageMin) || isNaN(ageMax)) {
      errors.push('Age range must be valid numbers');
    } else if (ageMin > ageMax) {
      errors.push('Minimum age cannot be greater than maximum age');
    } else if (ageMin < 0 || ageMax < 0) {
      errors.push('Age cannot be negative');
    }
  }

  // Validate date range
  if (query.dateFrom && query.dateTo) {
    const dateFrom = new Date(query.dateFrom);
    const dateTo = new Date(query.dateTo);
    if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
      errors.push('Date range must be valid dates');
    } else if (dateFrom > dateTo) {
      errors.push('Start date cannot be after end date');
    }
  }

  // Validate sortBy
  if (query.sortBy && !['date', 'quantity', 'customerName'].includes(query.sortBy)) {
    errors.push('Invalid sortBy parameter. Must be: date, quantity, or customerName');
  }

  // Validate sortOrder
  if (query.sortOrder && !['asc', 'desc'].includes(query.sortOrder)) {
    errors.push('Invalid sortOrder parameter. Must be: asc or desc');
  }

  // Validate page
  if (query.page !== undefined) {
    const page = parseInt(query.page);
    if (isNaN(page) || page < 1) {
      errors.push('Page must be a positive integer');
    }
  }

  // Validate limit
  if (query.limit !== undefined) {
    const limit = parseInt(query.limit);
    if (isNaN(limit) || limit < 1) {
      errors.push('Limit must be a positive integer');
    }
  }

  return errors;
};

export const parseArrayParam = (param) => {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  if (typeof param === 'string') {
    return param.split(',').map(item => item.trim()).filter(item => item);
  }
  return [];
};



