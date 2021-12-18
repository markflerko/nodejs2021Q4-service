/* eslint-disable import/no-import-module-exports */
import { tasksRepository } from '../../repository/database';

const readTasks = () => tasksRepository;

module.exports = readTasks;
