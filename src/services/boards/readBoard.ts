/* eslint-disable import/no-import-module-exports */
import { boardsRepository } from '../../repository/database';

const readBoard = (id: string) => {
  const board = boardsRepository.find((item) => item.id === id);
  return board;
};

export default readBoard;
