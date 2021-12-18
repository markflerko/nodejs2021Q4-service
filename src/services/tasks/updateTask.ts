/* eslint-disable import/no-import-module-exports */
import { tasksRepository } from '../../repository/database';
import { ITask } from '../../models/Task';

const updateTask = ({ id, body }: { id: string; body: ITask }) => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository[index] = {
    ...tasksRepository[index],
    ...body,
  };

  return tasksRepository[index];
};

module.exports = updateTask;
