const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;