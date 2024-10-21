// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const workflowRoutes = require('./routes/workflowRoutes');
const config = require('./config/config');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON requests
// Routes
app.use('/api', workflowRoutes);

// Connect to MongoDB (if using)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
