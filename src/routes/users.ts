import { IncomingMessage, ServerResponse } from 'http';
import { usersRepository } from '../repository/database';
import { isUuid } from '../utils/isUuid';
import { Router } from './Router';
import { responseBuilder } from '../utils/responseBuilder';
import { getPathFromReq } from '../utils/getPathFromReq';
import { bodyParser } from '../utils/bodyParser';
import { IUser } from '../models/User';
import deleteUser from '../services/users/deleteUser';
import readUser from '../services/users/readUser';
import readUsers from '../services/users/readUsers';
import createUser from '../services/users/createUser';
import updateUser from '../services/users/updateUser';

const router = new Router();

/**
 * control post request on user route
 * @param req request object from client
 * @param res response object that send to client as a result of request handling
 */
const postHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const data = await bodyParser<IUser>(req);

  const haveName = Object.prototype.hasOwnProperty.call(data, 'name');
  const haveLogin = Object.prototype.hasOwnProperty.call(data, 'login');
  const havePass = Object.prototype.hasOwnProperty.call(data, 'password');
  if (!haveName || !haveLogin || !havePass) {
    responseBuilder({
      res,
      code: 400,
      message: `You didn't provide one of required fields, please check name: ${data.name} login: ${data.login} password: ${data.password}\n`,
    });
  } else {
    const person = createUser({ data });
    responseBuilder({ res, code: 201, body: person });
  }
};

router.post('users', postHandler);

/**
 * control get request on user route, and on user route with id as params
 * @param req request object from client
 * @param res response object that send to client as a result of request handling
 */
const getHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getPathFromReq(req);
  const haveId = usersRepository.some((item) => item.id === id);

  if (!id) {
    const users = readUsers();
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
      message: `Sorry but no user with ${id} exist \n`,
    });
  } else {
    const user = readUser(id);

    responseBuilder({
      res,
      code: 200,
      body: user,
    });
  }
};

router.get('users', getHandler);

/**
 * control put request on user route
 * @param req request object from client
 * @param res response object that send to client as a result of request handling
 */

const putHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getPathFromReq(req);

  const data = await bodyParser<IUser>(req);

  const haveId = usersRepository.some((item) => item.id === id);

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
};

router.put('users', putHandler);

/**
 * control delete request on user route
 * @param req request object from client
 * @param res response object that send to client as a result of request handling
 */
const deleteHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const id = getPathFromReq(req);
  const haveId = usersRepository.some((item) => item.id === id);

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
};

router.delete('users', deleteHandler);

export default router;
