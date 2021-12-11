const { usersRepository } = require('../../repository/database');

const readUsers = () =>
  usersRepository.map((item) => ({
    id: item.id,
    name: item.name,
    login: item.login,
  }));

module.exports = readUsers;
