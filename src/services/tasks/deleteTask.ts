import { tasksRepository } from '../../repository/database';

/**
 * Delete task entity from db
 * @param id indemnificator of entity in db
 * @returns boolean (true if entity was deleted and false otherwise)
 */
export const deleteTask = (id: string | undefined): boolean => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository.splice(index, 1);
  return tasksRepository.findIndex((item) => item.id === id) === -1;
};

export default deleteTask;
