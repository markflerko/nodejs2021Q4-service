/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Board, IBoard } from '../../models/Board';
import { boardsRepository } from '../../repository/database';

const createBoard = ({ data }: { data: IBoard }) => {
  const id = uuidv4();
  const columns = data.columns.map((item) => ({
    ...item,
  }));
  const board = new Board({ ...data, id, columns });
  boardsRepository.push(board);
  return board;
};

module.exports = createBoard;
