# Backend API Documentation

## Overview

RESTful API built with Node.js and Express for the Retail Sales Management System. Provides endpoints for searching, filtering, sorting, and paginating sales data.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)

## API Endpoints

### GET /api/sales

Retrieve sales data with search, filtering, sorting, and pagination.

**Query Parameters:**

- `search` (string, optional) - Search in Customer Name or Phone Number
- `region` (array, optional) - Filter by Customer Region (comma-separated or array)
- `gender` (array, optional) - Filter by Gender (comma-separated or array)
- `ageMin` (number, optional) - Minimum age
- `ageMax` (number, optional) - Maximum age
- `category` (array, optional) - Filter by Product Category (comma-separated or array)
- `tags` (array, optional) - Filter by Tags (comma-separated or array)
- `paymentMethod` (array, optional) - Filter by Payment Method (comma-separated or array)
- `dateFrom` (date, optional) - Start date (YYYY-MM-DD)
- `dateTo` (date, optional) - End date (YYYY-MM-DD)
- `sortBy` (string, optional) - Sort field: 'date', 'quantity', or 'customerName' (default: 'date')
- `sortOrder` (string, optional) - Sort order: 'asc' or 'desc' (default: 'desc')
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)

**Response:**

```json
{
  "data": [...],
  "total": 1000,
  "page": 1,
  "totalPages": 100,
  "limit": 10
}
```

### GET /api/sales/filter-options

Get available filter options for dropdowns.

**Response:**

```json
{
  "regions": [...],
  "genders": [...],
  "categories": [...],
  "paymentMethods": [...],
  "tags": [...]
}
```

## Environment Variables

Create a `.env` file in the backend directory. You can use either a connection string or individual parameters:

**Option 1: Using Connection String (Recommended for Render/Heroku)**
```
PORT=5000
DATABASE_URL=postgresql://retail_management_db_user:HthHrga16wEEQbQ3Z7XOL4v4lSr1VtwK@dpg-d4r69nndiees739lbal0-a.oregon-postgres.render.com/retail_management_db
NODE_ENV=development
```

**Option 2: Using Individual Parameters**
```
PORT=5000
DB_HOST=dpg-d4r69nndiees739lbal0-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=retail_management_db
DB_USER=retail_management_db_user
DB_PASSWORD=HthHrga16wEEQbQ3Z7XOL4v4lSr1VtwK
NODE_ENV=development
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env` (already configured for Render database)

3. Import data:

**Recommended: Start with a sample (10,000 rows) for testing:**
```bash
npm run import-sample
```

**Or import custom number of rows:**
```bash
node src/utils/importData.js 50000
```

**Or import all rows (may take 30-60+ minutes):**
```bash
npm run import-data
```

(Place your CSV file as `sales_data.csv` in the project root or `data/` folder)

**Note**: For development/testing, importing 10,000-50,000 rows is usually sufficient. See `IMPORT_GUIDE.md` for details.

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

**Note:** The database connection is already configured for the Render PostgreSQL database. Make sure your CSV data file is available before running the import script.


