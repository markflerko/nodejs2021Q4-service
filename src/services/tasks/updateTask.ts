import { ITask } from '../../models/Task';
import { tasksRepository } from '../../repository/database';

/**
 * Update task in db by it id
 * @param config.id indemnificator of entity in db
 * @param config.body required data to update Task entity
 * @returns updated task or undefined if not found
 */
const updateTask = ({ id, body }: { id: string | undefined; body: ITask }): ITask | undefined => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository[index] = {
    ...tasksRepository[index],
    ...body,
  };

  return tasksRepository[index];
};

export default updateTask;
