import { tasksRepository } from '../../repository/database';

const readBoard = (id: string) => {
  const task = tasksRepository.find((item) => item.id === id);
  return task;
};

export default readBoard;
