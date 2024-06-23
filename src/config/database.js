const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const logger = require('./logger');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

});

pool.connect((err) => {
  if (err) {
    console.error('Fehler beim Herstellen der Verbindung zur Datenbank:', err);
  } else {
    console.log('Verbindung zur Datenbank hergestellt.');
  }
});
//const poolConfigToLog = { ...pool };
//logger.info(`Creating a new database pool with config: ${JSON.stringify(poolConfigToLog)}`);


module.exports = pool;
