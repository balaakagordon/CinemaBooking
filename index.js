const express = require('express');
const path = require('path');
const app = express();

const logger = require('./middleware/logger');

// Init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/seats', require('./routes/api/seats'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});