// api/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully for Vercel.'))
    .catch((err) => console.error('MongoDB connection error:', err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Important: The path here MUST match the folder structure

// This is the crucial part for Vercel
// It exports the Express app instance to be used as a serverless function
module.exports = app;