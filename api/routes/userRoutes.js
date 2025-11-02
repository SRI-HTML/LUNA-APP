// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router(); // Get the express router
const User = require('../models/User'); // Import our User model
const bcrypt = require('bcryptjs'); // We need bcrypt to compare passwords during login

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    try {
        // Get the name, email, and password from the frontend request body
        const { name, email, password } = req.body;

        // --- VALIDATION ---
        // 1. Check if a user with that email already exists in the database
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            // If they exist, send back a 400 Bad Request error
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // 2. Create a new user object with the provided data
        const newUser = new User({
            name,
            email,
            password,
        });

        // 3. Save the new user to the database.
        // (The 'pre-save' hook in User.js will automatically hash the password before it's saved!)
        await newUser.save();

        // 4. Send a success response
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});


// @route   POST /api/users/login
// @desc    Authenticate a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- AUTHENTICATION ---
        // 1. Find a user in the database with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            // SECURITY: Don't tell the attacker "user not found". Use a generic message.
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        // 2. If a user is found, compare the password from the login form with the
        //    HASHED password stored in our database. `bcrypt.compare` does this securely.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // SECURITY: Use the same generic message for wrong password.
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        // 3. If login is successful, send back a success message and user's name
        res.status(200).json({
            message: 'Login successful!',
            name: user.name
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router; // Export the router