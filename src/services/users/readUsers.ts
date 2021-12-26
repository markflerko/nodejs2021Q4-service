import { usersRepository } from '../../repository/database';

/**
 * Return all users entities as array from in-memory database
 * @returns all users entities as array
 */
const readUsers = (): { id?: string; name: string; login: string }[] =>
  usersRepository.map((item) => ({
    id: item.id,
    name: item.name,
    login: item.login,
  }));

export default readUsers;
