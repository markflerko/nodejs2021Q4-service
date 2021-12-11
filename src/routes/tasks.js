const Router = require('./Router/index');
const { tasksRepository } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');
const createTask = require('../services/tasks/createTask');
const readBoards = require('../services/boards/readBoards');
const readBoard = require('../services/boards/readBoard');
const bodyParser = require('../utils/bodyParser');
const updateBoard = require('../services/boards/updateBoard');
const deleteBoard = require('../services/boards/deleteBoard');

const router = new Router();

const createSubRouter = (boardId) => {
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
