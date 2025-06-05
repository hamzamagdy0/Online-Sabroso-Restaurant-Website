const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
    try {
        const { UserName, Email, Password, PhoneNo, role } = req.body;
    console.log(req.body)
        if (!UserName || !Email || !Password || !PhoneNo || !role) {
            return res.status(400).send({
                message: "Send all required fields."
            });
        }
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already in use." });
        }

        const newUser = { UserName, Email, Password, PhoneNo,role };
        const user = await User.create(newUser);

        return res.status(201).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { UserName, Email, Password, PhoneNo, role } = req.body;

        if (!UserName || !Email || !Password || !PhoneNo || !role) {
            return res.status(400).send({
                message: "Send all required fields."
            });
        }

        const { id } = req.params;
        const updatedUser = { UserName, Email, Password, PhoneNo, role };
        const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
