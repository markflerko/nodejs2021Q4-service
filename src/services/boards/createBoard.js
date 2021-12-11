const { v4: uuidv4 } = require('uuid');
const { boardsRepository } = require('../../repository/database');
const { Board } = require('../../models/Board');

const createUser = ({ data }) => {
  const id = uuidv4();
  const board = new Board({ ...data, id });
  boardsRepository.push(board);
  return board;
};

module.exports = createUser;
