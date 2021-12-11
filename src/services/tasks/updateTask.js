const { tasksRepository } = require('../../repository/database');

const updateTask = ({ id, body }) => {
  const index = tasksRepository.findIndex((item) => item.id === id);
  tasksRepository[index] = {
    ...tasksRepository[index],
    ...body,
  };

  return tasksRepository[index];
};

module.exports = updateTask;
