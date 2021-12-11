const { usersRepository } = require('../../repository/database');

const deleteUser = (id) => {
  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository.copyWithin(index, index + 1).pop();
  return usersRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteUser;
