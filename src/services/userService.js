const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { SALT_ROUNDS, SECRET } = require('../../config/constants');
const bcrypt = require('bcrypt');

exports.registerUser = async (userData) => {

    await Promise.all([
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]).catch((error) => {
        throw new Error(error);
    });

    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
        throw new Error(errors.array().map((error) => error.msg).join(', '));
    }

    const user = await User.findOne({ email: userData.email });

    if (user) {
        return "User with this email already exists!";
    } else {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const password = await bcrypt.hash(userData.password, salt);
        const user = await User.create({ ...userData, password: password });
        return user;
    }
};

exports.loginUser = async ({ email, password }) => {

    await Promise.all([
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]).catch((error) => {
        throw new Error(error);
    });

    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
        throw new Error(errors.array().map((error) => error.msg).join(', '));
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return "User not found!";
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return "Invalid email or password!";
    } else {
        return user;
    }
};

exports.generateToken = async (userData) => {
    const token = await jwtSign({ _id: userData._id }, SECRET, { expiresIn: '2h' });
    return token;
};