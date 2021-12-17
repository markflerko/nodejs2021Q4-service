const pathParser = (req) => {
  const pathFull = req.url.split('/').slice(1);
  const [, id1, pathIdPath, id2] = pathFull;
  return pathIdPath === 'tasks' ? id2 : id1;
};

module.exports = pathParser;
