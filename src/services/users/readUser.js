const { database } = require('../../repository/database');

const readUser = (id) => database.find((item) => item.id === id);

module.exports = readUser;
