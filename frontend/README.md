# Frontend Documentation

## Overview

React-based frontend application for the Retail Sales Management System. Built with Vite for fast development and optimized builds.

## Tech Stack

- React 18
- Vite
- React Router (for routing if needed)
- Context API (for state management)
- Axios (for API calls)

## Component Structure

- `App.jsx` - Main application component
- `SearchBar.jsx` - Search input component with debouncing
- `FilterPanel.jsx` - Multi-select and range filters
- `SortDropdown.jsx` - Sorting controls
- `SalesTable.jsx` - Data table display
- `Pagination.jsx` - Page navigation
- `LoadingSpinner.jsx` - Loading state indicator
- `EmptyState.jsx` - No results message

## State Management

Uses React Context API (`SalesContext`) to manage:
- Sales data
- Search term
- Active filters
- Sort options
- Pagination state
- Loading and error states

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

4. Build for production:
```bash
npm run build
```



