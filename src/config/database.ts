import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';
//import logger from './logger';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const poolConfig: DatabaseConfig = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string, 10),
};

const pool = new Pool(poolConfig);

pool.connect((err) => {
  if (err) {
    console.error('Fehler beim Herstellen der Verbindung zur Datenbank:', err);
  } else {
    console.log('Verbindung zur Datenbank hergestellt.');
  }
});

// Optional logging of the pool config
// logger.info(`Creating a new database pool with config: ${JSON.stringify(poolConfig)}`);

export default pool;
