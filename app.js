const express = require('express');
const cors = require('cors');
const tokenRoutes = require('./routes/tokenRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();


//app. 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/tokens', tokenRoutes);

// Middleware error hanlding
app.use(errorHandler);

module.exports = app;