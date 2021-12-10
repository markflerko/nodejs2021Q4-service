const { database } = require('../../repository/database');

const updatePerson = ({ id, body }) => {
  const user = database.find((item) => item.id === id);
  user.name = body.name ? body.name : user.name;
  user.login = body.login ? body.login : user.login;
  user.password = body.password ? body.password : user.password;
  return user;
};

module.exports = updatePerson;
