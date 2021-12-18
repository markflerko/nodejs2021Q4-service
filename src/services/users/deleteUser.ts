/* eslint-disable import/no-import-module-exports */
import { tasksRepository, usersRepository } from '../../repository/database';

const updateTask = require('../tasks/updateTask');

const deleteUser = (id: string) => {
  tasksRepository
    .filter((item) => item.userId === id)
    .forEach((item) => {
      updateTask({ id: item.id, body: { userId: null } });
    });

  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository.splice(index, 1);
  return usersRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteUser;
