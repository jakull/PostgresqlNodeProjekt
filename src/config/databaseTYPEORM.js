require('dotenv').config();
const { createConnection } = require('typeorm');

const connectDatabase = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      __dirname + '/../models/*.js'
    ],
    synchronize: true,
    logging: false
  });
  console.log('Database connected successfully');
};

module.exports = connectDatabase;
