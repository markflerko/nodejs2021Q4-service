/* eslint-disable import/no-import-module-exports */
import { tasksRepository, boardsRepository } from '../../repository/database';

const deleteTask = require('../tasks/deleteTask');

const deleteBoard = (id: string) => {
  tasksRepository
    .filter((item) => item.boardId === id)
    .forEach((item) => {
      deleteTask(item.id);
    });
  const index = boardsRepository.findIndex((item) => item.id === id);
  boardsRepository.copyWithin(index, index + 1).pop();
  return boardsRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteBoard;
