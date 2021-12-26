import { ITask } from "../../models/Task";
import { tasksRepository } from '../../repository/database';

/**
 * Return task entity from in-memory database by it id
 * @param id indemnificator of entity in db
 * @returns task entity or undefined if not found
 */
const readTask = (id: string): ITask | undefined => {
  const task = tasksRepository.find((item) => item.id === id);
  return task;
};

export default readTask;
