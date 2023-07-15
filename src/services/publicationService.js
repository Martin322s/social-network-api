const Publication = require('../models/Publication');

exports.createPublication = async (data) => await Publication.create(data);
exports.getAll = async () => await Publication.find();