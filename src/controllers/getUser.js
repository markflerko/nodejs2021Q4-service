/* eslint-disable no-useless-catch */
const { database } = require('../repository/database');
const readUser = require('../services/readUser');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');
const readUsers = require('../services/readUsers');

const getUser = async (req, res) => {
  try {
    const id = getIdFromReq(req);
    const haveId = Object.prototype.hasOwnProperty.call(database, id);

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
  } catch (error) {
    throw error;
  }
};

module.exports = getUser;
