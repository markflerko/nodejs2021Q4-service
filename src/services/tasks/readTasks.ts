import { ITask } from '../../models/Task';
import { tasksRepository } from '../../repository/database';

/**
 * Return all tasks entities as array from in-memory database
 * @returns all tasks entities as array
 */
const readTasks = (): ITask[] => tasksRepository;

export default readTasks;
