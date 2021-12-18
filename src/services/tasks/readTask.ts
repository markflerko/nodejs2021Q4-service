/* eslint-disable import/no-import-module-exports */
import { tasksRepository } from '../../repository/database';

const readBoard = (id: string) => {
  const task = tasksRepository.find((item) => item.id === id);
  return task;
};

module.exports = readBoard;
