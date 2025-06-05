const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js'); 
require('dotenv').config();
const { SECRET_KEY } = process.env;



router.post('/register', async (req, res) => {
    const { UserName, Email, Password, PhoneNo, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({ UserName, Email, Password, PhoneNo, role });

        // Save user to database
        await user.save();

        // Return success response
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        console.log(`Attempting login for email: ${Email}`);

        // Find user by email
        const user = await User.findOne({ Email });
        if (!user) {
            console.log(`User not found for email: ${Email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`User found: ${user.Email}`);

        // Check password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            console.log(`Password does not match for email: ${Email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`Password matches for email: ${Email}`);

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(`Token created for email: ${Email}`);

        return res.status(200).json({ token, user });

    } catch (error) {
        console.error(`Error during login for email: ${Email}`, error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
