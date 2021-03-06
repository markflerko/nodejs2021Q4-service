const { v4: uuidv4 } = require('uuid');
const { usersRepository } = require('../../repository/database');
const { User } = require('../../models/User');

const createUser = ({ data }) => {
  const id = uuidv4();
  const user = new User({ ...data, id });
  usersRepository.push(user);
  return {
    id: user.id,
    name: user.name,
    login: user.login,
  };
};

module.exports = createUser;
