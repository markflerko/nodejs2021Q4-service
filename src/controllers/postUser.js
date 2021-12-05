/* eslint-disable no-useless-catch */
const createUser = require('../services/createUser');
const bodyParser = require('../utils/bodyParser');
const responseBuilder = require('../utils/responseBuilder');

const postUsers = async (req, res) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

module.exports = postUsers;
