import { IncomingMessage, ServerResponse } from 'http';
import { Router } from './Router';
import { tasksRepository } from '../repository/database';
import { isUuid } from '../utils/isUuid';
import { responseBuilder } from '../utils/responseBuilder';
import { getPathFromReq } from '../utils/getPathFromReq';
import { bodyParser } from '../utils/bodyParser';
import { ITask } from '../models/Task';
import createTask from '../services/tasks/createTask';
import readTasks from '../services/tasks/readTasks';
import readTask from '../services/tasks/readTask';
import updateTask from '../services/tasks/updateTask';
import deleteTask from '../services/tasks/deleteTask';

const router = new Router();

export const createSubRouter = (boardId: string) => {
  router.put(`boards/${boardId}/tasks`, async (req: IncomingMessage, res: ServerResponse) => {
    const id = getPathFromReq(req);

    const data = await bodyParser<ITask>(req);

    const haveId = tasksRepository.some((item) => item.id === id);

    if (!isUuid(id)) {
      responseBuilder({
        res,
        code: 400,
        message: `Sorry but id: ${id} doesnt match uuid format \n`,
      });
    } else if (!haveId) {
      responseBuilder({
        res,
        code: 404,
        message: `Sorry but no task with ${id} exist \n`,
      });
    } else {
      const updatedTask = updateTask({ id, body: data });
      responseBuilder({ res, code: 200, body: updatedTask });
    }
  });

  router.delete(`boards/${boardId}/tasks`, async (req: IncomingMessage, res: ServerResponse) => {
    const id = getPathFromReq(req);
    const haveId = tasksRepository.some((item) => item.id === id);

    if (!isUuid(id)) {
      responseBuilder({
        res,
        code: 400,
        message: `Sorry but id: ${id} doesnt match uuid format \n`,
      });
    } else if (!haveId) {
      responseBuilder({
        res,
        code: 404,
        message: `Sorry but no task with ${id} exist \n`,
      });
    } else {
      const isTaskDeleted = deleteTask(id);
      if (isTaskDeleted) {
        responseBuilder({ res, code: 204 });
      }
    }
  });

  router.get(`boards/${boardId}/tasks`, async (req: IncomingMessage, res: ServerResponse) => {
    const id = getPathFromReq(req);
    const haveId = tasksRepository.some((item) => item.id === id);

    if (!id) {
      const tasks = readTasks();
      responseBuilder({ res, code: 200, body: tasks });
    } else if (!isUuid(id)) {
      responseBuilder({
        res,
        code: 400,
        message: `Sorry but id: ${id} doesnt match uuid format \n`,
      });
    } else if (!haveId) {
      responseBuilder({
        res,
        code: 404,
        message: `Sorry but no task with ${id} exist \n`,
      });
    } else {
      const task = readTask(id);

      responseBuilder({
        res,
        code: 200,
        body: task,
      });
    }
  });

  router.post(`boards/${boardId}/tasks`, async (req: IncomingMessage, res: ServerResponse) => {
    const data = await bodyParser<ITask>(req);

    const haveTitle = Object.prototype.hasOwnProperty.call(data, 'title');
    const haveOrder = Object.prototype.hasOwnProperty.call(data, 'order');
    const haveDescription = Object.prototype.hasOwnProperty.call(data, 'description');
    const haveUserId = Object.prototype.hasOwnProperty.call(data, 'userId');
    const haveBoardId = Object.prototype.hasOwnProperty.call(data, 'boardId');
    if (!haveTitle || !haveOrder || !haveDescription || !haveUserId || !haveBoardId) {
      responseBuilder({
        res,
        code: 400,
        message: `You didn't provide one of required fields, please check title: ${data.title} order: ${data.order} description: ${data.description} userId: ${data.userId} boardId: ${data.boardId} columnId: ${data.columnId}\n`,
      });
    } else {
      const task = createTask({ data, boardId });
      responseBuilder({ res, code: 201, body: task });
    }
  });
};

export default router;
