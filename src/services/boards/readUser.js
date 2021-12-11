const { database } = require('../../repository/database');

const readUser = (id) => {
  const user = database.find((item) => item.id === id);
  return {
    id: user.id,
    name: user.name,
    login: user.login,
  };
};

module.exports = readUser;
