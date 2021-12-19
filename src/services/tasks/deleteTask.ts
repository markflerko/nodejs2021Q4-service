import { tasksRepository } from '../../repository/database';

export const deleteTask = (id: string | undefined) => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository.splice(index, 1);
  return tasksRepository.findIndex((item) => item.id === id) === -1;
};

export default deleteTask;
