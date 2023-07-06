const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    phone: {
        type: String,
    },
    day: {
        type: String
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    about: {
        type: String
    },
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    publications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;