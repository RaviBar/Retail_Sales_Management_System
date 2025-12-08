import pool from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create table if it doesn't exist
const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sales (
      id SERIAL PRIMARY KEY,
      customer_id VARCHAR(255),
      customer_name VARCHAR(255),
      phone_number VARCHAR(50),
      gender VARCHAR(50),
      age INTEGER,
      customer_region VARCHAR(255),
      customer_type VARCHAR(255),
      product_id VARCHAR(255),
      product_name VARCHAR(255),
      brand VARCHAR(255),
      product_category VARCHAR(255),
      tags TEXT,
      quantity INTEGER,
      price_per_unit DECIMAL(10, 2),
      discount_percentage DECIMAL(5, 2),
      total_amount DECIMAL(10, 2),
      final_amount DECIMAL(10, 2),
      date DATE,
      payment_method VARCHAR(255),
      order_status VARCHAR(255),
      delivery_type VARCHAR(255),
      store_id VARCHAR(255),
      store_location VARCHAR(255),
      salesperson_id VARCHAR(255),
      employee_name VARCHAR(255)
    );

    CREATE INDEX IF NOT EXISTS idx_customer_name ON sales(LOWER(customer_name));
    CREATE INDEX IF NOT EXISTS idx_phone_number ON sales(LOWER(phone_number));
    CREATE INDEX IF NOT EXISTS idx_customer_region ON sales(customer_region);
    CREATE INDEX IF NOT EXISTS idx_gender ON sales(gender);
    CREATE INDEX IF NOT EXISTS idx_age ON sales(age);
    CREATE INDEX IF NOT EXISTS idx_product_category ON sales(product_category);
    CREATE INDEX IF NOT EXISTS idx_payment_method ON sales(payment_method);
    CREATE INDEX IF NOT EXISTS idx_date ON sales(date);
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table and indexes created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
};

// Parse CSV line
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

// Import data from CSV
const importCSV = async (filePath, rowLimit = null) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.log('No data to import');
      return;
    }

    // Get headers
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_'));
    console.log('Headers:', headers);

    // Map headers to database columns (case-insensitive, handles variations)
    const headerMap = {
      'transaction_id': null, // Skip transaction ID
      'date': 'date',
      'customer_id': 'customer_id',
      'customer_name': 'customer_name',
      'phone_number': 'phone_number',
      'gender': 'gender',
      'age': 'age',
      'customer_region': 'customer_region',
      'customer_type': 'customer_type',
      'product_id': 'product_id',
      'product_name': 'product_name',
      'brand': 'brand',
      'product_category': 'product_category',
      'tags': 'tags',
      'quantity': 'quantity',
      'pri': null, // Skip the "Pri" column (appears to be duplicate/extra)
      'price_per_unit': 'price_per_unit',
      'discount_percentage': 'discount_percentage',
      'total_amount': 'total_amount',
      'final_amount': 'final_amount',
      'payment_method': 'payment_method',
      'order_status': 'order_status',
      'delivery_type': 'delivery_type',
      'store_id': 'store_id',
      'store_location': 'store_location',
      'salesperson_id': 'salesperson_id',
      'employee_name': 'employee_name'
    };

    // Clear existing data
    await pool.query('TRUNCATE TABLE sales CASCADE');

    // Insert data in batches (smaller batches for large files)
    const batchSize = 50;
    const insertQuery = `
      INSERT INTO sales (
        customer_id, customer_name, phone_number, gender, age,
        customer_region, customer_type, product_id, product_name, brand,
        product_category, tags, quantity, price_per_unit, discount_percentage,
        total_amount, final_amount, date, payment_method, order_status,
        delivery_type, store_id, store_location, salesperson_id, employee_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    `;

    let batch = [];
    let inserted = 0;

    // Get column indices for database fields
    const getColumnIndex = (fieldName) => {
      const index = headers.findIndex(h => h === fieldName);
      return index >= 0 ? index : null;
    };

    const maxRows = rowLimit ? Math.min(rowLimit, lines.length - 1) : lines.length - 1;
    console.log(`Processing ${maxRows.toLocaleString()} rows...`);

    for (let i = 1; i <= maxRows && i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length < headers.length) {
        console.warn(`Skipping row ${i + 1}: insufficient columns (${values.length} vs ${headers.length})`);
        continue;
      }

      // Helper to get value by header name
      const getValue = (headerName) => {
        const index = getColumnIndex(headerName);
        if (index === null || index >= values.length) return null;
        const val = values[index]?.replace(/^"|"$/g, '').trim();
        return val === '' ? null : val;
      };

      const dbValues = [
        getValue('customer_id'),
        getValue('customer_name'),
        getValue('phone_number'),
        getValue('gender'),
        getValue('age') ? parseInt(getValue('age')) : null,
        getValue('customer_region'),
        getValue('customer_type'),
        getValue('product_id'),
        getValue('product_name'),
        getValue('brand'),
        getValue('product_category'),
        getValue('tags'),
        getValue('quantity') ? parseInt(getValue('quantity')) : null,
        getValue('price_per_unit') ? parseFloat(getValue('price_per_unit')) : null,
        getValue('discount_percentage') ? parseFloat(getValue('discount_percentage')) : null,
        getValue('total_amount') ? parseFloat(getValue('total_amount')) : null,
        getValue('final_amount') ? parseFloat(getValue('final_amount')) : null,
        getValue('date'),
        getValue('payment_method'),
        getValue('order_status'),
        getValue('delivery_type'),
        getValue('store_id'),
        getValue('store_location'),
        getValue('salesperson_id'),
        getValue('employee_name')
      ];

      batch.push(dbValues);

      if (batch.length >= batchSize) {
        // Use transaction for batch insert
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          for (const values of batch) {
            await client.query(insertQuery, values);
          }
          await client.query('COMMIT');
          inserted += batch.length;
          console.log(`Inserted ${inserted} rows...`);
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } finally {
          client.release();
        }
        batch = [];
      }
    }

    // Insert remaining rows
    if (batch.length > 0) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        for (const values of batch) {
          await client.query(insertQuery, values);
        }
        await client.query('COMMIT');
        inserted += batch.length;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    }

    console.log(`Successfully imported ${inserted} rows`);
  } catch (error) {
    console.error('Error importing CSV:', error);
    throw error;
  }
};

// Main import function
const main = async () => {
  try {
    // Get limit from command line argument (e.g., node importData.js 10000)
    const rowLimit = process.argv[2] ? parseInt(process.argv[2]) : null;
    
    if (rowLimit) {
      console.log(`⚠️  IMPORTING LIMITED ROWS: ${rowLimit.toLocaleString()} rows`);
      console.log('   (For full import, run without limit argument)');
    } else {
      console.log('⚠️  IMPORTING ALL ROWS (this may take a long time for large files)');
      console.log('   (To limit rows, run: npm run import-data -- 10000)');
    }
    
    console.log('Creating table...');
    await createTable();

    // Look for CSV file in common locations
    const possiblePaths = [
      path.join(__dirname, '../../data/sales_data.csv'),
      path.join(__dirname, '../../sales_data.csv'),
      path.join(process.cwd(), 'sales_data.csv'),
      path.join(process.cwd(), 'data/sales_data.csv'),
      'C:\\Users\\rishi\\Desktop\\ravi_sassay_hh\\data\\sales_data.csv' // Direct path for Windows
    ];

    let csvPath = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        csvPath = p;
        break;
      }
    }

    if (!csvPath) {
      console.log('CSV file not found. Please place sales_data.csv in the project root or data/ folder.');
      console.log('Expected locations:');
      possiblePaths.forEach(p => console.log(`  - ${p}`));
      return;
    }

    console.log(`Importing data from ${csvPath}...`);
    await importCSV(csvPath, rowLimit);
    console.log('Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
};

main();


