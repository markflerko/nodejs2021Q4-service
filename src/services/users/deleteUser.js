const { database } = require('../../repository/database');

const deleteUser = (id) => {
  const index = database.findIndex((item) => item.id === id);
  database.copyWithin(index, index + 1).pop();
  return database.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteUser;
