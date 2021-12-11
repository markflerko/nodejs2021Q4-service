const { v4: uuidv4 } = require('uuid');
const { tasksRepository } = require('../../repository/database');
const { Task } = require('../../models/Task');

const createTask = ({ data }) => {
  const id = uuidv4();
  const task = new Task({ ...data, id });
  tasksRepository.push(task);
  return task;
};

module.exports = createTask;
