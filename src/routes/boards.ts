import { IncomingMessage, ServerResponse } from 'http';
import { Router } from './Router';
import { boardsRepository } from '../repository/database';
import { isUuid } from '../utils/isUuid';
import { responseBuilder } from '../utils/responseBuilder';
import { getIdFromReq } from '../utils/getPathFromReq';
import { bodyParser } from '../utils/bodyParser';
import { IBoard } from '../models/Board';
import createBoard from '../services/boards/createBoard';
import readBoards from '../services/boards/readBoards';
import readBoard from '../services/boards/readBoard';
import updateBoard from '../services/boards/updateBoard';
import deleteBoard from '../services/boards/deleteBoard';
import { createSubRouter } from './tasks';

const router = new Router();

/**
 * control post request on boards route
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
const postHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const data = await bodyParser<IBoard>(req);
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
};

router.post('boards', postHandler);

/**
 * control get request on boards route, and on boards route with id as params
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
const getHandler = async (req: IncomingMessage, res: ServerResponse) => {
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
};

router.get('boards', getHandler);

/**
 * control put request on boards route
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
const putHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getIdFromReq(req);

  const data = await bodyParser<IBoard>(req);

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
};

router.put('boards', putHandler);

/**
 * control delete request on boards route
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
const deleteHandler = async (req: IncomingMessage, res: ServerResponse) => {
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
};

router.delete('boards', deleteHandler);

export default router;
