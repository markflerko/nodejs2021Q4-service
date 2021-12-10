const { database } = require('../../repository/database');

const deleteUser = (id) => delete database[id];

module.exports = deleteUser;
