const { boardsRepository } = require('../../repository/database');

const deleteBoard = (id) => {
  const index = boardsRepository.findIndex((item) => item.id === id);
  boardsRepository.copyWithin(index, index + 1).pop();
  return boardsRepository.findIndex((item) => item.id === id) === -1;
};

module.exports = deleteBoard;
