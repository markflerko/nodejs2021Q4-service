import { v4 as uuidv4 } from 'uuid';
import { usersRepository } from '../../repository/database';
import { IUser, User } from '../../models/User';

/**
 * Create user entity in db
 * @param config.data required data to create User entity
 * @returns created user without password
 */
const createUser = ({
  data,
}: {
  data: IUser;
}): {
  id?: string;
  name: string;
  login: string;
} => {
  const id = uuidv4();
  const user = new User({ ...data, id });
  usersRepository.push(user);
  return {
    id: user.id,
    name: user.name,
    login: user.login,
  };
};

export default createUser;
