// models/items.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    microsieverts: {
        type: Number,
        default: undefined,
    },
});

module.exports = mongoose.model('Item', ItemSchema);