import { v4 as uuidv4 } from 'uuid';
import { Board, IBoard } from '../../models/Board';
import { boardsRepository } from '../../repository/database';

/**
 * Create board entity in db
 * @param config.data required data to create Board entity
 * @returns created board
 */
const createBoard = ({ data }: { data: IBoard }): IBoard => {
  const id = uuidv4();
  const columns = data.columns.map((item) => ({
    ...item,
  }));
  const board = new Board({ ...data, id, columns });
  boardsRepository.push(board);
  return board;
};

export default createBoard;
