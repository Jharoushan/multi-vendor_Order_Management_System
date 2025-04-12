const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.port || 5000;

mongoose.connect(process.env.DB_connect)
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Listeniing on port ${PORT}`));
  })
  .catch(err => console.error('Database error:', err));
