# Data Import Guide

## Should You Import All 1 Million Rows?

**Short Answer: Probably not for initial testing/development.**

### Considerations:

1. **Time**: Importing 1M rows can take 30-60 minutes or more
2. **Cost**: Render database operations may incur costs
3. **Testing**: You don't need all data to test functionality
4. **Development**: A sample is sufficient for development

### Recommended Approach:

**Start with a sample (10,000-50,000 rows)** to:
- Test the import process
- Verify the application works
- Develop and debug faster
- Save time and resources

**Import full dataset only when:**
- You're ready for production/demo
- You need to test performance with full dataset
- You have confirmed the application works correctly

## Import Options

### Option 1: Import Sample (Recommended for Testing)

Import first 10,000 rows:
```bash
cd backend
npm run import-sample
```

Or specify custom limit:
```bash
cd backend
node src/utils/importData.js 50000
```

### Option 2: Import All Rows

Import complete dataset (1M+ rows):
```bash
cd backend
npm run import-data
```

**Note**: This will take 30-60+ minutes. Make sure you have:
- Stable internet connection
- Render database can handle the load
- Time to wait for completion

## Import Process

1. **Create `.env` file** in `backend/` directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://retail_management_db_user:HthHrga16wEEQbQ3Z7XOL4v4lSr1VtwK@dpg-d4r69nndiees739lbal0-a.oregon-postgres.render.com/retail_management_db
   NODE_ENV=development
   ```

2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Run import** (choose one):
   - Sample: `npm run import-sample` (10k rows)
   - Custom: `node src/utils/importData.js 50000` (50k rows)
   - Full: `npm run import-data` (all rows)

4. **Monitor progress**: The script shows progress updates

## What Gets Imported

The import script will:
- ✅ Create `sales` table with all required fields
- ✅ Create indexes for performance
- ✅ Parse CSV and handle the "Pri" column
- ✅ Import data in batches (50 rows per batch)
- ✅ Show progress updates
- ✅ Handle errors gracefully

## Troubleshooting

**Import fails or times out:**
- Try smaller batch (e.g., 5,000 rows first)
- Check database connection
- Verify CSV file path

**Out of memory errors:**
- The script reads the file line by line, but very large files might still cause issues
- Consider splitting the CSV file if needed

**Slow import:**
- This is normal for large datasets
- Network speed to Render affects import time
- Be patient, the script shows progress

## Recommendation

**For Assignment/Demo:**
- Import 10,000-50,000 rows (sufficient to demonstrate all features)
- This shows the system works with real data
- Much faster to set up and test
- All features (search, filter, sort, pagination) work the same

**For Production:**
- Import full dataset when ready
- Test performance with full dataset
- Monitor database usage and costs


