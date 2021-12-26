import { usersRepository } from '../../repository/database';
import { IUser } from '../../models/User';

/**
 * Update user in db by it id
 * @param config.id indemnificator of entity in db
 * @param config.body required data to update user entity
 * @returns updated user or undefined if not found
 */
const updatePerson = ({ id, body }: { id: string; body: IUser }): IUser | undefined => {
  const index = usersRepository.findIndex((item) => item.id === id);
  usersRepository[index] = {
    ...usersRepository[index],
    ...body,
  };

  return usersRepository[index];
};

export default updatePerson;
