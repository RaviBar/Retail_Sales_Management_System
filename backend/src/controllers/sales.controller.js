import { getSales, getFilterOptions } from '../services/sales.service.js';
import { validateQueryParams, parseArrayParam } from '../utils/validators.js';

export const getSalesData = async (req, res) => {
  try {
    // Validate query parameters
    const validationErrors = validateQueryParams(req.query);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid query parameters',
        details: validationErrors 
      });
    }

    // Parse and prepare filters
    const filters = {
      search: req.query.search || null,
      region: parseArrayParam(req.query.region),
      gender: parseArrayParam(req.query.gender),
      ageMin: req.query.ageMin ? parseInt(req.query.ageMin) : null,
      ageMax: req.query.ageMax ? parseInt(req.query.ageMax) : null,
      category: parseArrayParam(req.query.category),
      tags: parseArrayParam(req.query.tags),
      paymentMethod: parseArrayParam(req.query.paymentMethod),
      dateFrom: req.query.dateFrom || null,
      dateTo: req.query.dateTo || null,
      sortBy: req.query.sortBy || 'date',
      sortOrder: req.query.sortOrder || 'desc',
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };

    // Get sales data
    const result = await getSales(filters);

    res.json(result);
  } catch (error) {
    console.error('Error in getSalesData controller:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sales data',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getFilterOptionsData = async (req, res) => {
  try {
    const options = await getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptionsData controller:', error);
    res.status(500).json({ 
      error: 'Failed to fetch filter options',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



