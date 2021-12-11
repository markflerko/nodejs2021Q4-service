const { boardsRepository } = require('../../repository/database');

const readBoards = () => boardsRepository;

module.exports = readBoards;
