/* eslint-disable import/no-import-module-exports */
import { Router } from './Router';
import { boardsRepository } from '../repository/database';
import { isUuid } from '../utils/isUuid';
import { responseBuilder } from '../utils/responseBuilder';

const getIdFromReq = require('../utils/getPathFromReq');
const createBoard = require('../services/boards/createBoard');
const readBoards = require('../services/boards/readBoards');
const readBoard = require('../services/boards/readBoard');
const bodyParser = require('../utils/bodyParser');
const updateBoard = require('../services/boards/updateBoard');
const deleteBoard = require('../services/boards/deleteBoard');
const { createSubRouter } = require('./tasks');

const router = new Router();

router.post('boards', async (req: any, res: any) => {
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
    createSubRouter(board.id);
    responseBuilder({ res, code: 201, body: board });
  }
});

router.get('boards', async (req: any, res: any) => {
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

router.put('boards', async (req: any, res: any) => {
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
      message: `Sorry but no board with ${id} exist \n`,
    });
  } else {
    const updatedBoard = updateBoard({ id, body: data });
    responseBuilder({ res, code: 200, body: updatedBoard });
  }
});

router.delete('boards', async (req: any, res: any) => {
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
      message: `Sorry but no board with ${id} exist \n`,
    });
  } else {
    const isBoardDeleted = deleteBoard(id);
    if (isBoardDeleted) {
      responseBuilder({ res, code: 204 });
    }
  }
});

module.exports = router;
