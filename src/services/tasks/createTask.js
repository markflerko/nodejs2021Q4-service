const { v4: uuidv4 } = require('uuid');
const { tasksRepository } = require('../../repository/database');
const { Task } = require('../../models/Task');

const createTask = ({ data, boardId }) => {
  const id = uuidv4();
  const task = new Task({ ...data, id, boardId });
  tasksRepository.push(task);
  return task;
};

module.exports = createTask;
