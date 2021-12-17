const { boardsRepository } = require('../../repository/database');

const readBoard = (id) => {
  const board = boardsRepository.find((item) => item.id === id);
  return board;
};

module.exports = readBoard;
