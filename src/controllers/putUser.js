/* eslint-disable no-useless-catch */
const updateUser = require('../services/updateUser');
const { database } = require('../repository/database');
const isUuid = require('../utils/isUuid');
const responseBuilder = require('../utils/responseBuilder');
const bodyParser = require('../utils/bodyParser');
const getIdFromReq = require('../utils/getPathFromReq');

const putPerson = async (req, res) => {
  try {
    const id = getIdFromReq(req);

    await bodyParser(req);
    const data = req.body;
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
      const updatedPerson = updateUser({ id, body: data });
      responseBuilder({ res, code: 200, body: updatedPerson });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = putPerson;
