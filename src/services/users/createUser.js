const { v4: uuidv4 } = require('uuid');
const { database } = require('../../repository/database');
const { User } = require('../../models/User');

const createUser = ({ data }) => {
  const id = uuidv4();
  const user = new User({ ...data, id });
  database.push(user);
  return user;
};

module.exports = createUser;
