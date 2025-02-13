// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/items.js');

const app = express();
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL || 'mongodb://localhost:27017';  

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
