// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // We need bcrypt for hashing

// This is the blueprint for a User in our database.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"], // Make the name required
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true, // No two users can share the same email address
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
});

// This is a "pre-save hook". It's a special function that Mongoose will run
// automatically RIGHT BEFORE a user document is saved to the database.
userSchema.pre('save', async function (next) {
    // We only want to re-hash the password if it's a new user or if the password
    // is being changed. We don't want to re-hash it every time a user updates their name, for example.
    if (!this.isModified('password')) {
        return next();
    }

    // "Salting and hashing" is the secure process.
    // 1. Generate a "salt" - a random string to make the hash unique. 10 rounds is a good strength.
    const salt = await bcrypt.genSalt(10);
    // 2. Hash the user's plain-text password with the salt.
    this.password = await bcrypt.hash(this.password, salt);
    
    next(); // Continue with the save operation
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model so our routes can use it