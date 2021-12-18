/* eslint-disable import/no-import-module-exports */
import { usersRepository } from '../../repository/database';
import { IUser } from '../../models/User';

const updatePerson = ({ id, body }: { id: string; body: IUser }) => {
  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository[index] = {
    ...usersRepository[index],
    ...body,
  };

  return usersRepository[index];
};

module.exports = updatePerson;
