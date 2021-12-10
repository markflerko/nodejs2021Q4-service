const { database } = require('../../repository/database');

const deleteUser = (id) => {
  try {
    return delete database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = deleteUser;
