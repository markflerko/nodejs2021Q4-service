/* eslint-disable import/no-import-module-exports */
import { tasksRepository } from '../../repository/database';

export const deleteTask = (id: string) => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository.splice(index, 1);
  return tasksRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteTask;
