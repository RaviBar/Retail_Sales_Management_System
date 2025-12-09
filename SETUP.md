# Quick Setup Guide

## Database Configuration

The project is configured to use a Render PostgreSQL database. To set up your `.env` file:

1. Navigate to the `backend/` directory
2. Create a `.env` file (copy from `.env.example` if needed)
3. Add the following configuration:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/db_name
NODE_ENV=development
```

## Database Connection Details

- **Host**: <DB_HOST>
- **Port**: 5432
- **Database**: <DB_NAME>
- **Username**: <DB_USER>
- **Password**: <DB_PASSWORD>

## Importing Data

1. Place your CSV file as `sales_data.csv` in the project root or `data/` folder
2. Run the import script:
```bash
cd backend
npm run import-data
```

The script will:
- Create the `sales` table if it doesn't exist
- Create necessary indexes for performance
- Import all data from the CSV file

## Starting the Application

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The backend will run on `http://localhost:5000` and frontend on `http://localhost:3000`.


