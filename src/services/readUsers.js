const { database } = require("../repository/database");

const readUsers = () => {
  try {
    return database;
  } catch (error) {
    throw error;
  }
};

module.exports = readUsers;
