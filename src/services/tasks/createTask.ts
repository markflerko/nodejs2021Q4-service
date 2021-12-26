import { v4 as uuidv4 } from 'uuid';
import { Task, ITask } from '../../models/Task';
import { tasksRepository } from '../../repository/database';

/**
 * Create task entity in db
 * @param config.data required data to create Task entity
 * @param config.boardId required id to assign task to
 * @returns created task
 */
const createTask = ({ data, boardId }: { data: ITask; boardId: string }): ITask => {
  const id = uuidv4();
  const task = new Task({ ...data, id, boardId });
  tasksRepository.push(task);
  return task;
};

export default createTask;
