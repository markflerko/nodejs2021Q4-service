import { tasksRepository, usersRepository } from '../../repository/database';
import updateTask from '../tasks/updateTask';

/**
 * Delete user entity from db
 * @param id indemnificator of entity in db
 * @returns boolean (true if entity was deleted and false otherwise)
 */
const deleteUser = (id: string): boolean => {
  tasksRepository
    .filter((item) => item.userId === id)
    .forEach((item) => {
      updateTask({ id: item.id, body: { userId: null } });
    });

  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository.splice(index, 1);
  return usersRepository.findIndex((item) => item.id === id) === -1;
};

export default deleteUser;
