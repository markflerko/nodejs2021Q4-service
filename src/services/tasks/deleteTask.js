const { tasksRepository } = require('../../repository/database');

const deleteBoard = (id) => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository.copyWithin(index, index + 1).pop();
  return tasksRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteBoard;
