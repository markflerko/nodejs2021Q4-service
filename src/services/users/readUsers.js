const { database } = require('../../repository/database');

const readUsers = () => database;

module.exports = readUsers;
