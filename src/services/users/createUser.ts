/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { usersRepository } from '../../repository/database';
import { IUser, User } from '../../models/User';

const createUser = ({ data }: { data: IUser }) => {
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
