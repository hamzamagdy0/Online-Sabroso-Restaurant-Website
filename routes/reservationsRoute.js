const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations.js');
const mongoose = require('mongoose');
const User = require('../models/users.js'); 




// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const {Email, ReservationDate, ReservationTime, NumberOfGuests } = req.body;

        if (!Email|| !ReservationDate || !ReservationTime || !NumberOfGuests) {
            return res.status(400).send({
                message: "Send all required fields."
            });
        }

        const user = await User.findOne({Email});
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const newReservation = {
            User: user._id,
            ReservationDate,
            ReservationTime,
            NumberOfGuests,
        };

        const reservation = await Reservation.create(newReservation);
        return res.status(201).send(reservation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('User');
        return res.status(200).json({
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get a reservation by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id).populate('User');

        if (!reservation) {
            return res.status(404).send({ message: "Reservation not found" });
        }

        return res.status(200).json(reservation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate the userId as a MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find reservations where User._id matches the provided userId
        const reservations = await Reservation.find({ User: userId }).populate('User');

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found for this user ID" });
        }

        return res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/username/:UserName', async (req, res) => {
    try {
        const { UserName } = req.params;
        const user = await User.findOne({UserName})
console.log(user);
        if (!user){
            return res.status(404).json({ message: "No User found with this username" });
        }
        const reservations = await Reservation.find({ User: user._id }).populate('User');
        
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found for this user ID" });
        }

        return res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a reservation by ID
router.put('/:id', async (req, res) => {
    try {
        const { Email, ReservationDate, ReservationTime, NumberOfGuests } = req.body;
        console.log(req.body)
        if (!Email || !ReservationDate || !ReservationTime || !NumberOfGuests) {
            return res.status(400).send({
                message: "Send all required fields."
            });
        }

        const { id } = req.params;
        const user = await User.findOne({Email});
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const updatedReservation = {
            User: user._id,
            ReservationDate,
            ReservationTime,
            NumberOfGuests,
        };

        const result = await Reservation.findByIdAndUpdate(id, updatedReservation, { new: true }).populate('User');

        if (!result) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        return res.status(200).send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Delete a reservation by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Reservation.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        return res.status(200).send({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
