const Router = require('./Router/index');
const { boardsRepository } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');
const createBoard = require('../services/boards/createBoard');
const readBoards = require('../services/boards/readBoards');
const readBoard = require('../services/boards/readBoard');
const bodyParser = require('../utils/bodyParser');
const updateUser = require('../services/users/updateUser');
const deleteUser = require('../services/users/deleteUser');

const router = new Router();

router.post('boards', async (req, res) => {
  await bodyParser(req);
  const data = req.body;
  const haveTitle = Object.prototype.hasOwnProperty.call(data, 'title');
  const haveColumns = Object.prototype.hasOwnProperty.call(data, 'columns');
  if (!haveTitle || !haveColumns) {
    responseBuilder({
      res,
      code: 400,
      message: `You didn't provide one of required fields, please check title: ${data.title} columns: ${data.columns}\n`,
    });
  } else {
    const board = createBoard({ data });
    responseBuilder({ res, code: 201, body: board });
  }
});

router.get('boards', async (req, res) => {
  const id = getIdFromReq(req);
  const haveId = boardsRepository.some((item) => item.id === id);

  if (!id) {
    const users = readBoards();
    responseBuilder({ res, code: 200, body: users });
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
      message: `Sorry but no board with ${id} exist \n`,
    });
  } else {
    const board = readBoard(id);

    responseBuilder({
      res,
      code: 200,
      body: board,
    });
  }
});

router.put('users', async (req, res) => {
  const id = getIdFromReq(req);

  await bodyParser(req);
  const data = req.body;
  const haveId = boardsRepository.some((item) => item.id === id);

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
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const updatedPerson = updateUser({ id, body: data });
    responseBuilder({ res, code: 200, body: updatedPerson });
  }
});

router.delete('users', async (req, res) => {
  const id = getIdFromReq(req);
  const haveId = boardsRepository.some((item) => item.id === id);

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
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const isUserDeleted = deleteUser(id);
    if (isUserDeleted) {
      responseBuilder({ res, code: 204 });
    }
  }
});

module.exports = router;
