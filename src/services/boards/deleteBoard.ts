import { tasksRepository, boardsRepository } from '../../repository/database';
import deleteTask from '../tasks/deleteTask';

/**
 * Delete board entity from db
 * @param id indemnificator of entity in db
 * @returns boolean (true if entity was deleted and false otherwise)
 */
const deleteBoard = (id: string): boolean => {
  tasksRepository
    ?.filter((item) => item.boardId === id)
    ?.forEach((item) => {
      deleteTask(item.id);
    });
  const index = boardsRepository.findIndex((item) => item.id === id);
  boardsRepository.copyWithin(index, index + 1).pop();
  return boardsRepository.findIndex((item) => item.id === id) === -1;
};

export default deleteBoard;
