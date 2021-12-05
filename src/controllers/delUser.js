/* eslint-disable no-useless-catch */
const deleteUser = require('../services/deleteUser');
const { database } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const getIdFromReq = require('../utils/getPathFromReq');

const delUser = async (req, res) => {
  try {
    const id = getIdFromReq(req);
    const haveId = Object.prototype.hasOwnProperty.call(database, id);

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
  } catch (error) {
    throw error;
  }
};

module.exports = delUser;
