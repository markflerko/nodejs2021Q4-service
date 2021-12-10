const { database } = require('../../repository/database');

const readUser = (id) => database[id];

module.exports = readUser;
