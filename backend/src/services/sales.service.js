import pool from '../utils/database.js';
import { buildSalesQuery, buildCountQuery, addSorting, addPagination } from '../utils/queryBuilder.js';

export const getSales = async (filters) => {
  try {
    // Build base query with filters
    let { query, params, paramIndex } = buildSalesQuery(filters);

    // Add sorting
    query = addSorting(query, filters.sortBy, filters.sortOrder, paramIndex);

    // Add pagination
    const { query: paginatedQuery, limit, offset } = 
      addPagination(query, filters.page, filters.limit, paramIndex);
    
    const finalParams = [...params, limit, offset];

    // Execute query
    const result = await pool.query(paginatedQuery, finalParams);

    // Get total count for pagination
    const { query: countQuery, params: countParams } = buildCountQuery(filters);
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    // Calculate pagination info
    const page = parseInt(filters.page) || 1;
    const totalPages = Math.ceil(total / limit);

    return {
      data: result.rows,
      total,
      page,
      totalPages,
      limit
    };
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    // Get distinct values for filter dropdowns
    const queries = {
      regions: 'SELECT DISTINCT customer_region as value FROM sales WHERE customer_region IS NOT NULL ORDER BY customer_region',
      genders: 'SELECT DISTINCT gender as value FROM sales WHERE gender IS NOT NULL ORDER BY gender',
      categories: 'SELECT DISTINCT product_category as value FROM sales WHERE product_category IS NOT NULL ORDER BY product_category',
      paymentMethods: 'SELECT DISTINCT payment_method as value FROM sales WHERE payment_method IS NOT NULL ORDER BY payment_method',
      tags: 'SELECT DISTINCT tags as value FROM sales WHERE tags IS NOT NULL AND tags != \'\' ORDER BY tags'
    };

    const results = await Promise.all([
      pool.query(queries.regions),
      pool.query(queries.genders),
      pool.query(queries.categories),
      pool.query(queries.paymentMethods),
      pool.query(queries.tags)
    ]);

    // Process tags - they might be comma-separated
    const allTags = new Set();
    results[4].rows.forEach(row => {
      if (row.value) {
        row.value.split(',').forEach(tag => {
          const trimmed = tag.trim();
          if (trimmed) allTags.add(trimmed);
        });
      }
    });

    return {
      regions: results[0].rows.map(r => r.value),
      genders: results[1].rows.map(r => r.value),
      categories: results[2].rows.map(r => r.value),
      paymentMethods: results[3].rows.map(r => r.value),
      tags: Array.from(allTags).sort()
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

