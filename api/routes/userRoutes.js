// api/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        // VVVVVVVVVVVVVVVVVVVV THIS IS THE CRITICAL CHANGE VVVVVVVVVVVVVVVVVVVV
        
        console.error('SERVER CRASH DURING REGISTRATION:', error); // Log the full error on the server
        
        // Instead of a generic message, we now send the REAL error.message to the frontend.
        // This will tell us EXACTLY what is wrong with the MongoDB connection.
        res.status(500).json({ message: error.message });

        // AAAAAAAAAAAAAAAAAAAA END OF THE CRITICAL CHANGE AAAAAAAAAAAAAAAAAAAA
    }
});


// @route   POST /api/users/login
// @desc    Authenticate a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        res.status(200).json({
            message: 'Login successful!',
            name: user.name
        });

    } catch (error) {
        // VVVVVVVVVVVVVVVVVVVV BONUS: ADDING DEBUGGING HERE TOO VVVVVVVVVVVVVVVVVVVV

        console.error('SERVER CRASH DURING LOGIN:', error);
        res.status(500).json({ message: error.message });
        
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    }
});

module.exports = router;