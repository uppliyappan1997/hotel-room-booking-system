const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());
app.use('/api', bookingRoutes);

module.exports = app;
