const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publicationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }
},
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;