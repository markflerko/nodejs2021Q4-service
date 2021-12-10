const { v4: uuidv4 } = require('uuid');
const { database } = require('../../repository/database');
const { User } = require('../../models/User');

const createUser = ({ data }) => {
  try {
    const id = uuidv4();
    database[id] = new User({ ...data, id });
    return database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = createUser;
