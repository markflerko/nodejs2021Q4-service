import { IBoard } from '../../models/Board';
import { boardsRepository } from '../../repository/database';

/**
 * Return all boards entities as array from in-memory database
 * @returns all boards entities as array
 */
const readBoards = (): IBoard[] => boardsRepository;

export default readBoards;
