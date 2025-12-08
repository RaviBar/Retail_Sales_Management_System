import pool from './database.js';

export const buildSalesQuery = (filters) => {
  let query = `
    SELECT 
      customer_id as "customerId",
      customer_name as "customerName",
      phone_number as "phoneNumber",
      gender,
      age,
      customer_region as "customerRegion",
      customer_type as "customerType",
      product_id as "productId",
      product_name as "productName",
      brand,
      product_category as "productCategory",
      tags,
      quantity,
      price_per_unit as "pricePerUnit",
      discount_percentage as "discountPercentage",
      total_amount as "totalAmount",
      final_amount as "finalAmount",
      date,
      payment_method as "paymentMethod",
      order_status as "orderStatus",
      delivery_type as "deliveryType",
      store_id as "storeId",
      store_location as "storeLocation",
      salesperson_id as "salespersonId",
      employee_name as "employeeName"
    FROM sales
    WHERE 1=1
  `;
  
  const params = [];
  let paramIndex = 1;

  // Search - Customer Name or Phone Number
  if (filters.search) {
    query += ` AND (
      LOWER(customer_name) LIKE LOWER($${paramIndex}) OR 
      LOWER(phone_number) LIKE LOWER($${paramIndex})
    )`;
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  // Filter: Customer Region (multi-select)
  if (filters.region && filters.region.length > 0) {
    query += ` AND customer_region = ANY($${paramIndex})`;
    params.push(filters.region);
    paramIndex++;
  }

  // Filter: Gender (multi-select)
  if (filters.gender && filters.gender.length > 0) {
    query += ` AND gender = ANY($${paramIndex})`;
    params.push(filters.gender);
    paramIndex++;
  }

  // Filter: Age Range
  if (filters.ageMin !== undefined && filters.ageMin !== null) {
    query += ` AND age >= $${paramIndex}`;
    params.push(filters.ageMin);
    paramIndex++;
  }
  if (filters.ageMax !== undefined && filters.ageMax !== null) {
    query += ` AND age <= $${paramIndex}`;
    params.push(filters.ageMax);
    paramIndex++;
  }

  // Filter: Product Category (multi-select)
  if (filters.category && filters.category.length > 0) {
    query += ` AND product_category = ANY($${paramIndex})`;
    params.push(filters.category);
    paramIndex++;
  }

  // Filter: Tags (multi-select) - Tags is stored as comma-separated string
  if (filters.tags && filters.tags.length > 0) {
    const tagConditions = filters.tags.map((tag) => {
      const condition = `tags LIKE $${paramIndex}`;
      params.push(`%${tag}%`);
      paramIndex++;
      return condition;
    });
    query += ` AND (${tagConditions.join(' OR ')})`;
  }

  // Filter: Payment Method (multi-select)
  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    query += ` AND payment_method = ANY($${paramIndex})`;
    params.push(filters.paymentMethod);
    paramIndex++;
  }

  // Filter: Date Range
  if (filters.dateFrom) {
    query += ` AND date >= $${paramIndex}`;
    params.push(filters.dateFrom);
    paramIndex++;
  }
  if (filters.dateTo) {
    query += ` AND date <= $${paramIndex}`;
    params.push(filters.dateTo);
    paramIndex++;
  }

  return { query, params, paramIndex };
};

export const buildCountQuery = (filters) => {
  const { query, params } = buildSalesQuery(filters);
  const countQuery = `SELECT COUNT(*) as total FROM (${query}) as filtered_sales`;
  return { query: countQuery, params };
};

export const addSorting = (query, sortBy, sortOrder, paramIndex) => {
  const orderByMap = {
    date: 'date',
    quantity: 'quantity',
    customerName: 'customer_name'
  };

  if (sortBy && orderByMap[sortBy]) {
    const order = sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    // For date, default to DESC (newest first) if not specified
    if (sortBy === 'date' && !sortOrder) {
      query += ` ORDER BY ${orderByMap[sortBy]} DESC`;
    } else {
      query += ` ORDER BY ${orderByMap[sortBy]} ${order}`;
    }
  } else {
    // Default sorting by date (newest first)
    query += ` ORDER BY date DESC`;
  }

  return query;
};

export const addPagination = (query, page, limit, paramIndex) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  return { query, limit: limitNum, offset, nextParamIndex: paramIndex + 2 };
};

