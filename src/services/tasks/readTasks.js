const { tasksRepository } = require('../../repository/database');

const readTasks = () => tasksRepository;

module.exports = readTasks;
