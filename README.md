# Retail Sales Management System

## Overview

A full-stack Retail Sales Management System that provides comprehensive search, filtering, sorting, and pagination capabilities for sales transaction data. The system enables efficient data exploration and analysis through an intuitive user interface backed by a robust RESTful API.

## Tech Stack

**Backend:**
- Node.js with Express.js
- PostgreSQL database
- pg (PostgreSQL client)

**Frontend:**
- React 18 with Vite
- Context API for state management
- Axios for API communication

## Search Implementation Summary

The search functionality implements case-insensitive, full-text search across Customer Name and Phone Number fields. Search queries are processed using SQL `ILIKE` with pattern matching, allowing substring matching. The search is debounced on the frontend (300ms) to optimize API calls and works seamlessly in combination with filters, sorting, and pagination.

## Filter Implementation Summary

Multi-select filters are implemented for Customer Region, Gender, Product Category, Tags, and Payment Method using SQL `IN` clauses with array parameters. Range-based filters are provided for Age (min/max) and Date (from/to) using SQL `BETWEEN` and comparison operators. All filters can work independently or in combination, with proper SQL query construction ensuring efficient database queries. Filter state is maintained across pagination and sorting operations.

## Sorting Implementation Summary

Sorting is implemented for three fields: Date (defaults to newest first), Quantity, and Customer Name (A-Z). The sorting logic uses SQL `ORDER BY` clauses with configurable ascending/descending order. Date sorting defaults to descending (newest first) when not explicitly specified. Sorting preserves active search and filter states, and is applied after filtering but before pagination.

## Pagination Implementation Summary

Pagination is implemented with a fixed page size of 10 items per page. The backend calculates total pages based on filtered results count and returns pagination metadata. SQL `LIMIT` and `OFFSET` are used for efficient data retrieval. Pagination state is maintained when filters, search, or sorting changes, with automatic reset to page 1 when search or filters are modified. Next/Previous navigation buttons are provided with proper disabled states at boundaries.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your database credentials (already configured for Render database):
```
PORT=5000
DATABASE_URL=DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<database>
NODE_ENV=development
```

4. Import the sales data (place your CSV file as `sales_data.csv` in the project root or `data/` folder):
```bash
npm run import-data
```

6. Start the backend server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file to configure API URL:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`

### Running Both Services

From the root directory, you can run both services using the workspace scripts:
```bash
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```