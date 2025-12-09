# Architecture Documentation

## Backend Architecture

The backend follows a layered architecture pattern with clear separation of concerns:

### Layer Structure

1. **Routes Layer** (`backend/src/routes/`)
   - Defines API endpoints and HTTP methods
   - Routes requests to appropriate controllers
   - Example: `sales.routes.js` handles `/api/sales` endpoints

2. **Controllers Layer** (`backend/src/controllers/`)
   - Handles HTTP request/response logic
   - Validates input parameters
   - Calls service layer methods
   - Formats responses
   - Example: `sales.controller.js` processes query parameters and returns JSON responses

3. **Services Layer** (`backend/src/services/`)
   - Contains business logic
   - Orchestrates data operations
   - Builds complex queries
   - Handles data transformation
   - Example: `sales.service.js` implements search, filter, sort, and pagination logic

4. **Utils Layer** (`backend/src/utils/`)
   - Reusable utility functions
   - Query building logic
   - Input validation
   - Database connection management
   - Examples: `queryBuilder.js`, `validators.js`, `database.js`

5. **Database Layer**
   - PostgreSQL database
   - Table schema with proper indexes
   - Raw SQL queries for performance
   - Connection pooling via `pg` library

### Data Flow (Backend)

```
HTTP Request → Routes → Controllers → Services → Query Builder → Database
                                                      ↓
HTTP Response ← Routes ← Controllers ← Services ← Query Results
```

### Key Components

- **Query Builder**: Dynamically constructs SQL queries based on filters, search, sorting, and pagination parameters
- **Validators**: Ensures input parameters are valid (ranges, types, constraints)
- **Database Connection**: Pooled PostgreSQL connections for efficient resource management

## Frontend Architecture

The frontend follows a component-based architecture with centralized state management:

### Component Hierarchy

```
App
├── SalesProvider (Context)
│   ├── SearchBar
│   ├── FilterPanel
│   ├── SortDropdown
│   ├── SalesTable
│   └── Pagination
```

### State Management

- **Context API**: `SalesContext` provides global state for:
  - Sales data
  - Search term
  - Active filters
  - Sort configuration
  - Pagination state
  - Loading and error states

### Component Responsibilities

1. **App.jsx**: Main application container, sets up layout structure
2. **SearchBar**: Handles search input with debouncing
3. **FilterPanel**: Manages multi-select and range filters
4. **SortDropdown**: Controls sorting options
5. **SalesTable**: Displays sales data in tabular format
6. **Pagination**: Handles page navigation
7. **LoadingSpinner**: Shows loading state
8. **EmptyState**: Displays when no results found

### Service Layer

- **api.js**: Axios instance with interceptors for error handling
- **salesService.js**: API communication functions, builds query parameters

### Data Flow (Frontend)

```
User Interaction → Component → Context Update → API Call → Backend
                                                              ↓
UI Update ← Component ← Context State ← API Response ← Backend Response
```

## Data Flow (End-to-End)

```
User Action (Search/Filter/Sort/Pagination)
    ↓
Frontend Component
    ↓
Context State Update
    ↓
API Service Call (Axios)
    ↓
HTTP Request to Backend
    ↓
Express Route Handler
    ↓
Controller (Parameter Extraction & Validation)
    ↓
Service (Business Logic)
    ↓
Query Builder (SQL Construction)
    ↓
PostgreSQL Database
    ↓
Query Results
    ↓
Service (Data Transformation)
    ↓
Controller (Response Formatting)
    ↓
HTTP Response (JSON)
    ↓
Frontend API Service
    ↓
Context State Update
    ↓
Component Re-render
    ↓
UI Update
```

## Folder Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   └── sales.controller.js
│   │   ├── services/           # Business logic
│   │   │   └── sales.service.js
│   │   ├── utils/              # Utilities
│   │   │   ├── database.js     # DB connection
│   │   │   ├── queryBuilder.js # SQL query construction
│   │   │   ├── validators.js   # Input validation
│   │   │   └── importData.js   # Data import script
│   │   ├── routes/             # API routes
│   │   │   └── sales.routes.js
│   │   └── index.js            # Server entry point
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── SortDropdown.jsx
│   │   │   ├── SalesTable.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── context/            # State management
│   │   │   └── SalesContext.jsx
│   │   ├── services/           # API communication
│   │   │   ├── api.js
│   │   │   └── salesService.js
│   │   ├── utils/              # Utility functions
│   │   │   ├── queryBuilder.js
│   │   │   └── formatters.js
│   │   ├── styles/             # CSS files
│   │   │   ├── index.css
│   │   │   └── App.css
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── docs/
│   └── architecture.md         # This file
└── README.md                    # Root readme
```

## Module Responsibilities

### Backend Modules

**routes/sales.routes.js**
- Defines API endpoint paths
- Maps HTTP methods to controller functions

**controllers/sales.controller.js**
- Extracts and validates query parameters
- Calls service methods
- Formats HTTP responses
- Handles errors

**services/sales.service.js**
- Implements search, filter, sort, and pagination logic
- Executes database queries
- Transforms data for responses
- Calculates pagination metadata

**utils/queryBuilder.js**
- Constructs SQL WHERE clauses for filters
- Builds search conditions
- Adds ORDER BY clauses
- Applies LIMIT and OFFSET for pagination

**utils/validators.js**
- Validates query parameters
- Checks range constraints (age, dates)
- Validates sort options
- Returns validation errors

**utils/database.js**
- Manages PostgreSQL connection pool
- Provides database connection utility

**utils/importData.js**
- Parses CSV data
- Creates database schema
- Imports data into PostgreSQL
- Handles data type conversions

### Frontend Modules

**context/SalesContext.jsx**
- Manages global application state
- Provides state update functions
- Handles data fetching
- Manages loading and error states

**services/salesService.js**
- Builds API request parameters
- Makes HTTP requests to backend
- Handles API responses

**services/api.js**
- Configures Axios instance
- Sets up request/response interceptors
- Handles errors globally

**components/SearchBar.jsx**
- Renders search input
- Implements debouncing
- Updates search state

**components/FilterPanel.jsx**
- Renders filter controls
- Manages filter state
- Provides clear filters functionality

**components/SortDropdown.jsx**
- Renders sort controls
- Updates sort state

**components/SalesTable.jsx**
- Displays sales data
- Formats data for display
- Handles empty and error states

**components/Pagination.jsx**
- Renders pagination controls
- Handles page navigation
- Disables buttons at boundaries

**utils/formatters.js**
- Formats dates, currency, percentages
- Handles null/undefined values

## Database Schema

**sales table:**
- Contains all customer, product, sales, and operational fields
- Indexes on search fields (customer_name, phone_number)
- Indexes on filter fields (region, gender, age, category, payment_method, date)
- Supports efficient querying and filtering

## Error Handling

**Backend:**
- Input validation at controller level
- Try-catch blocks in services
- Centralized error middleware
- Appropriate HTTP status codes

**Frontend:**
- Error states in context
- User-friendly error messages
- Loading states during API calls
- Graceful degradation

## Performance Optimizations

- Database indexes on frequently queried fields
- Query parameterization to prevent SQL injection
- Debounced search input (300ms)
- Efficient SQL query construction
- Connection pooling for database
- Pagination to limit data transfer



