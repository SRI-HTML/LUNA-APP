// api/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// VVVVVVVVVVVVVVVVVVVVVVV THIS IS THE PART WE ARE FIXING VVVVVVVVVVVVVVVVVVVVVVVVVV

const mongoURI = process.env.MONGO_URI_V2;

// We are removing the old, unnecessary options.
// This is the modern, correct way to connect.
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connection successful.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// This exports the Express app for Vercel to use as a serverless function
module.exports = app;