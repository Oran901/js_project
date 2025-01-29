const express = require('express');
const Item = require('../models/items.js'); 

const router = express.Router();

// other fruit for testing 🍏 🍎 🥝
const fruitEmojis = {
    apples: '🍎',
    bananas: '🍌',
    oranges: '🍊',
    avocados: '🥝',
};


// @route   GET /
// @desc    Get all items
router.get('/', async (req, res) => {
    try {
        // Fetch all items from the database
        const items = await Item.find();

        // Generate a string of emojis for each fruit
        const emojiResponse = items.map(item => {
            const emoji = fruitEmojis[item.name] || '❓'; // Get the emoji or fallback to '❓'
            return `${emoji} `.repeat(item.qty).trim(); // Repeat the emoji based on qty
        });

        // Join all the emoji strings and return as HTML
        res.send(`
            <div style="font-family: Arial, sans-serif; font-size: 24px; text-align: center; margin-top: 50px;">
                ${emojiResponse.join('<br>')}
            </div>
        `);
    } catch (err) {
        res.status(500).send('<h1>Something went wrong!</h1>');
    }
});



// @route   GET /:name
// @desc    Get a single item by name and display its emoji repeated by quantity
router.get('/:name', async (req, res) => {
    try {
        // Find the item by name
        const item = await Item.findOne({ name: req.params.name });

        if (!item) {
            return res.status(404).send('<h1>Item not found</h1>');
        }

        // Get the emoji for the fruit name, or fallback to a placeholder
        const emoji = fruitEmojis[item.name] || '❓';

        // Generate the repeated emojis based on `qty`
        const repeatedEmojis = `${emoji} `.repeat(item.qty).trim();

        // Return the emojis in the response
        res.send(`
            <div style="font-family: Arial, sans-serif; font-size: 24px; text-align: center; margin-top: 50px;">
                ${repeatedEmojis}
            </div>
        `);
    } catch (err) {
        res.status(500).send('<h1>Something went wrong!</h1>');
    }
});


module.exports = router;
