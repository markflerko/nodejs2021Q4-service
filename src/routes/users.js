const Router = require('./Router/index');
const deleteUser = require('../services/users/deleteUser');
const { usersRepository } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');
const readUser = require('../services/users/readUser');
const readUsers = require('../services/users/readUsers');
const createUser = require('../services/users/createUser');
const bodyParser = require('../utils/bodyParser');
const updateUser = require('../services/users/updateUser');

const router = new Router();

router.post('users', async (req, res) => {
  await bodyParser(req);
  const data = req.body;
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
});

router.get('users', async (req, res) => {
  const id = getIdFromReq(req);
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
});

router.put('users', async (req, res) => {
  const id = getIdFromReq(req);

  await bodyParser(req);
  const data = req.body;
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
});

router.delete('users', async (req, res) => {
  const id = getIdFromReq(req);
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
});

module.exports = router;
