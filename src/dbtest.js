const pool = require('./config/database');
const logger = require('./config/logger');

pool.query('SELECT * FROM angestellte', (err, res) => {
    if (err) {
      logger.error(`Database connection error: ${err.message}`);
      logger.error(`Pool: ${JSON.stringify(pool, null, 2)}`);
    } else {
      logger.info(`Database connected successfully: ${JSON.stringify(res)}`);
    }
    console.log("RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSPONSE:",res);
    pool.end();
  });