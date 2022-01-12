import { ITask } from '../models/Task';
import { IBoard } from '../models/Board';
import { IUser } from '../models/User';
import users from '../database/users.json';
import boards from '../database/boards.json';
import tasks from '../database/tasks.json';

export const usersRepository: IUser[] = users;
export const boardsRepository: IBoard[] = boards;
export const tasksRepository: ITask[] = tasks;
