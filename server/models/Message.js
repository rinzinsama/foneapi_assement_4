const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
    
});

const Item = mongoose.model('Message', itemSchema);

module.exports = Item;
