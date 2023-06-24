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
    birthday: {
        day: {
            type: Number
        },
        month: {
            type: Number
        },
        year: {
            type: Number
        }
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