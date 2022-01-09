import { ITask } from '../models/Task';
import { IBoard } from '../models/Board';
import { IUser } from '../models/User';
import users from '../database/users.json';

export const usersRepository: IUser[] = users;
export const boardsRepository: IBoard[] = [];
export const tasksRepository: ITask[] = [];
