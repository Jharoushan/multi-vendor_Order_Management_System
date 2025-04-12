const express = require('express');
const app = express();
const authentRoutes = require('./routes/authentRoutes');

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);



app.use(express.json());

app.use('/api/auth', authentRoutes);

module.exports = app;

const adminAnalyticsRoutes = require('./routes/adminAnalyticsRoutes');
const vendorAnalyticsRoutes = require('./routes/vendorAnalyticsRoutes');

app.use('/api/analytics/admin', adminAnalyticsRoutes);
app.use('/api/analytics/vendor', vendorAnalyticsRoutes);

