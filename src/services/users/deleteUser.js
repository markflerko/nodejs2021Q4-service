const {
  usersRepository,
  tasksRepository,
} = require('../../repository/database');
const updateTask = require('../tasks/updateTask');

const deleteUser = (id) => {
  tasksRepository
    .filter((item) => item.userId === id)
    .forEach((item) => {
      updateTask({ id: item.id, body: { userId: null } });
    });

  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository.copyWithin(index, index + 1).pop();
  return usersRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteUser;
