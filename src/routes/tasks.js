const Router = require('./Router/index');
const { tasksRepository } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');
const createTask = require('../services/tasks/createTask');
const readTasks = require('../services/tasks/readTasks');
const readTask = require('../services/tasks/readTask');
const bodyParser = require('../utils/bodyParser');
const updateTask = require('../services/tasks/updateTask');
const deleteTask = require('../services/tasks/deleteTask');

const router = new Router();

const createSubRouter = (boardId) => {
  router.put(`boards/${boardId}/tasks`, async (req, res) => {
    const id = getIdFromReq(req);

    await bodyParser(req);
    const data = req.body;
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

  router.delete(`boards/${boardId}/tasks`, async (req, res) => {
    const id = getIdFromReq(req);
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

  router.get(`boards/${boardId}/tasks`, async (req, res) => {
    const id = getIdFromReq(req);
    const haveId = tasksRepository.some((item) => item.id === id);
    console.log('id: ', id);

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

  router.post(`boards/${boardId}/tasks`, async (req, res) => {
    await bodyParser(req);
    const data = req.body;
    const haveTitle = Object.prototype.hasOwnProperty.call(data, 'title');
    const haveOrder = Object.prototype.hasOwnProperty.call(data, 'order');
    const haveDescription = Object.prototype.hasOwnProperty.call(
      data,
      'description'
    );
    const haveUserId = Object.prototype.hasOwnProperty.call(data, 'userId');
    const haveBoardId = Object.prototype.hasOwnProperty.call(data, 'boardId');
    const haveColumnId = Object.prototype.hasOwnProperty.call(data, 'columnId');
    if (
      !haveTitle ||
      !haveOrder ||
      !haveDescription ||
      !haveUserId ||
      !haveBoardId ||
      !haveColumnId
    ) {
      responseBuilder({
        res,
        code: 400,
        message: `You didn't provide one of required fields, please check title: ${data.title} order: ${data.order} description: ${data.description} userId: ${data.userId} boardId: ${data.boardId} columnId: ${data.columnId}\n`,
      });
    } else {
      const task = createTask({ data });
      responseBuilder({ res, code: 201, body: task });
    }
  });
};

exports.createSubRouter = createSubRouter;
exports.tasksRouter = router;
