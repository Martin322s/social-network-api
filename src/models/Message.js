const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;