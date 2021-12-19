/* eslint-disable import/no-import-module-exports */
import { boardsRepository } from '../../repository/database';

const readBoards = () => boardsRepository;

export default readBoards;
