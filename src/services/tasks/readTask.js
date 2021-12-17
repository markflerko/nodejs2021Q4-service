const { tasksRepository } = require('../../repository/database');

const readBoard = (id) => {
  const task = tasksRepository.find((item) => item.id === id);
  return task;
};

module.exports = readBoard;
