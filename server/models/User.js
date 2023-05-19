const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    displayname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
});

const Item = mongoose.model('User', itemSchema);

module.exports = Item;
