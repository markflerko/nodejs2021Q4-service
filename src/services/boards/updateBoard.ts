import { boardsRepository } from '../../repository/database';
import { IBoard } from '../../models/Board';

/**
 * Update board in db by it id
 * @param config.id indemnificator of entity in db
 * @param config.body required data to update Board entity
 * @returns updated board or undefined if not found
 */
const updateBoard = ({ id, body }: { id: string; body: IBoard }): IBoard | undefined => {
  const index = boardsRepository.findIndex((item) => item.id === id);
  boardsRepository[index] = {
    ...boardsRepository[index],
    ...body,
  };
  return boardsRepository[index];
};

export default updateBoard;
