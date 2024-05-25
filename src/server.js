const express = require('express');
const bodyParser = require('body-parser');
const sqlRoutes = require('./routes/sqlRoutes');
const typeormRoutes = require('./routes/ORMRoutes');
require('dotenv').config();
const connectDatabase = require('./config/databaseTYPEORM');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', typeormRoutes);
app.use('/api', sqlRoutes);

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database', error);
});
