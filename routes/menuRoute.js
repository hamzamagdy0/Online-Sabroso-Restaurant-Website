const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.js');
const mongoose = require('mongoose');


// Create a new menu item
router.post('/', async (req, res) => {
    try {
        const { ItemName, ItemPrice, Category } = req.body;

        if (!ItemName || !ItemPrice || !Category) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const newItem = new Menu({
            ItemName,
            ItemPrice,
            Category
        });

        const savedItem = await newItem.save();
        return res.status(201).json(savedItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find({});
        return res.status(200).json(menuItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get a specific menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu item ID format" });
        }

        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json(menuItem);
    } catch (error) {
        console.error("Error fetching menu item:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get menu items by category (exact match)
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const menuItems = await Menu.find({ Category: category });
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ message: "No menu items found for this category" });
        }

        return res.status(200).json(menuItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a specific menu item by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ItemName, ItemPrice, Category } = req.body;

        if (!ItemName || !ItemPrice || !Category) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu item ID format" });
        }

        const updatedItem = await Menu.findByIdAndUpdate(
            id,
            { ItemName, ItemPrice, Category },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a specific menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid menu item ID format" });
        }

        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
