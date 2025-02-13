const express = require('express');
const Item = require('../models/items.js');

const router = express.Router();

// Other fruit for testing 🍏 🍎 🥝 🥑 🍊 🍌
const fruitEmojis = {
    apples: '🍎',
    bananas: '🍌',
    oranges: '🍊',
    avocados: '🥑',
};

// Function to generate UI
const generateHTML = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fruit Inventory</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 26px;
            margin-bottom: 10px;
            color: #333;
        }
        .fruit-card {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            padding: 15px;
            font-size: 32px;
        }
        .emoji {
            display: inline-block;
            transition: transform 0.2s ease-in-out;
        }
        .emoji:hover {
            transform: scale(1.2);
        }
        .not-found {
            font-size: 20px;
            color: red;
        }
        .update-form {
            margin-top: 20px;
        }
        .input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 80px;
            text-align: center;
        }
        .btn {
            padding: 10px 15px;
            font-size: 16px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .btn:hover {
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>
`;

// @route   GET /
// @desc    Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        if (items.length === 0) {
            return res.send(generateHTML('<h1>No Fruits Available 🍏</h1>'));
        }

        const fruitCards = items.map(item => {
            const emoji = fruitEmojis[item.name] || '❓';
            const emojiDisplay = `${emoji} `.repeat(item.qty).trim();
            return `
                <div class="fruit-card">${emojiDisplay}</div>
                <form class="update-form" action="/update/${item.name}" method="POST">
                    <input type="number" name="qty" class="input" min="0" value="${item.qty}" required>
                    <button type="submit" class="btn">Update</button>
                </form>
                <hr>
            `;
        }).join('');

        res.send(generateHTML(`
            <h1>Fruit Inventory 🍎🍌🥑</h1>
            ${fruitCards}
        `));
    } catch (err) {
        res.status(500).send(generateHTML('<h1>Something went wrong! ❌</h1>'));
    }
});

// @route   GET /:name
// @desc    Get a single item by name and display its emoji repeated by quantity
router.get('/:name', async (req, res) => {
    try {
        const item = await Item.findOne({ name: req.params.name });

        if (!item) {
            return res.status(404).send(generateHTML('<h1 class="not-found">Item not found 🚫</h1>'));
        }

        const emoji = fruitEmojis[item.name] || '❓';
        const repeatedEmojis = `${emoji} `.repeat(item.qty).trim();

        res.send(generateHTML(`
            <h1>${item.name.charAt(0).toUpperCase() + item.name.slice(1)} Inventory</h1>
            <div class="fruit-card">${repeatedEmojis}</div>
            <form class="update-form" action="/update/${item.name}" method="POST">
                <input type="number" name="qty" class="input" min="0" value="${item.qty}" required>
                <button type="submit" class="btn">Update</button>
            </form>
        `));
    } catch (err) {
        res.status(500).send(generateHTML('<h1>Something went wrong! ❌</h1>'));
    }
});

// @route   POST /update/:name
// @desc    Update fruit quantity in the database
router.post('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        let { qty } = req.body;

        // Ensure qty is properly parsed
        qty = parseInt(qty, 10);

        // Validate qty
        if (isNaN(qty) || qty < 0 || qty > 600) {
            return res.status(400).send(generateHTML('<h1 class="not-found">Invalid quantity (must be between 0 and 600) 🚫</h1>'));
        }

        const updatedItem = await Item.findOneAndUpdate(
            { name },
            { qty },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).send(generateHTML('<h1 class="not-found">Item not found 🚫</h1>'));
        }

        res.redirect('/');
    } catch (err) {
        res.status(500).send(generateHTML('<h1>Something went wrong! ❌</h1>'));
    }
});


module.exports = router;
