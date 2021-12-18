/* eslint-disable import/no-import-module-exports */
import { usersRepository } from '../../repository/database';

const readUsers = () =>
  usersRepository.map((item) => ({
    id: item.id,
    name: item.name,
    login: item.login,
  }));

module.exports = readUsers;
