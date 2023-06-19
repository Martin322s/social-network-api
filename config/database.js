const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./constants');

exports.initDatabase = () => mongoose.connect(CONNECTION_STRING);