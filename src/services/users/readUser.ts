/* eslint-disable import/no-import-module-exports */
import { usersRepository } from '../../repository/database';

const readUser = (id: string) => {
  const user = usersRepository.find((item) => item.id === id);
  return {
    id: user?.id,
    name: user?.name,
    login: user?.login,
  };
};

module.exports = readUser;
