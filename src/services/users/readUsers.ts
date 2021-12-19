import { usersRepository } from '../../repository/database';

const readUsers = () =>
  usersRepository.map((item) => ({
    id: item.id,
    name: item.name,
    login: item.login,
  }));

export default readUsers;
