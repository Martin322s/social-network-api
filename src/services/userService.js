const User = require('../models/User');
const { SALT_ROUNDS } = require('../../config/constants');
const bcrypt = require('bcrypt');

exports.registerUser = async (userData) => {
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