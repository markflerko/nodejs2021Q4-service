const { tasksRepository } = require('../../repository/database');

const updateBoard = ({ id, body }) => {
  const task = tasksRepository.find((item) => item.id === id);
  task.title = body.title ? body.title : task.title;
  task.order = body.order ? body.order : task.order;
  task.description = body.description ? body.description : task.description;
  task.userId = body.userId ? body.userId : task.userId;
  task.boardId = body.boardId ? body.boardId : task.boardId;
  task.columnId = body.columnId ? body.columnId : task.columnId;
  return task;
};

module.exports = updateBoard;
