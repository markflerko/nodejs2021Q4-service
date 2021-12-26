import { IBoard } from "../../models/Board";
import { boardsRepository } from '../../repository/database';

/**
 * Return board entity from in-memory database by it id
 * @param id indemnificator of entity in db
 * @returns board entity or undefined if not found
 */
const readBoard = (id: string): IBoard | undefined => {
  const board = boardsRepository.find((item) => item.id === id);
  return board;
};

export default readBoard;
