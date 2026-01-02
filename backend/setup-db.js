const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connect to PostgreSQL server (not a specific database)
const sequelize = new Sequelize(
  'postgres', // Connect to default postgres database
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log,
  }
);

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL server.');

    // Check if database exists
    const [results] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`
    );

    if (results.length === 0) {
      // Create database
      await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database '${process.env.DB_NAME}' created successfully.`);
    } else {
      console.log(`Database '${process.env.DB_NAME}' already exists.`);
    }

    await sequelize.close();
    console.log('Database setup completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error.message);
    console.error('\nPlease make sure:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database credentials in .env are correct');
    console.error('3. User has permission to create databases');
    process.exit(1);
  }
}

setupDatabase();

