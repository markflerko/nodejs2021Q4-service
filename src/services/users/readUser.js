const { database } = require("../../repository/database");

const readUser = (id) => {
  try {
    return database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = readUser;
