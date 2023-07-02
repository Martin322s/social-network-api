const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { SALT_ROUNDS, SECRET } = require('../../config/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtSign = promisify(jwt.sign)

exports.registerUser = async (userData) => {

    const user = await User.findOne({ email: userData.email });

    if (user) {
        return "User with this email already exists!";
    } else {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const password = await bcrypt.hash(userData.password, salt);
        const newUser = await User.create({ ...userData, password: password });
        return newUser;
    }
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        return { message: "User not found!" };
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

exports.getUserById = async (userId) => await User.findById({ _id: userId }).lean();

exports.updateUserProfile = async (userId, userData) =>
    await User.findByIdAndUpdate({ _id: userId }, userData);

exports.deleteUserProfile = async (userId) => await User.findByIdAndDelete({ _id: userId });