const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    
    
});

const Item = mongoose.model('Contact', itemSchema);

module.exports = Item;
