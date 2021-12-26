import { usersRepository } from '../../repository/database';

/**
 * Return user entity from in-memory database by it id
 * @param id indemnificator of entity in db
 * @returns user entity or undefined if not found
 */
const readUser = (id: string): { id?: string; name?: string; login?: string } | undefined => {
  const user = usersRepository.find((item) => item.id === id);
  return {
    id: user?.id,
    name: user?.name,
    login: user?.login,
  };
};

export default readUser;
