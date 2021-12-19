/* eslint-disable import/no-import-module-exports */
import { boardsRepository } from '../../repository/database';
import { IBoard } from '../../models/Board';

const updateBoard = ({ id, body }: { id: string; body: IBoard }) => {
  const index = boardsRepository.findIndex((item) => item.id === id);
  boardsRepository[index] = {
    ...boardsRepository[index],
    ...body,
  };
  return boardsRepository[index];
};

export default updateBoard;
