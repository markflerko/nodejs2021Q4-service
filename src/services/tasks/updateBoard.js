const { boardsRepository } = require('../../repository/database');

const updateBoard = ({ id, body }) => {
  const board = boardsRepository.find((item) => item.id === id);
  board.title = body.title ? body.title : board.title;
  board.columns = body.columns ? body.columns : board.columns;
  return board;
};

module.exports = updateBoard;
