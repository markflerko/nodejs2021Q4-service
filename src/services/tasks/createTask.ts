/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Task, ITask } from '../../models/Task';
import { tasksRepository } from '../../repository/database';

const createTask = ({ data, boardId }: { data: ITask; boardId: string }) => {
  const id = uuidv4();
  const task = new Task({ ...data, id, boardId });
  tasksRepository.push(task);
  return task;
};

module.exports = createTask;
