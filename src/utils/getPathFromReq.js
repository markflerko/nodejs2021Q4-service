const pathParser = (req) => {
  const pathFull = req.url.split('/').slice(1);
  const [, userId] = pathFull;
  return userId;
};

module.exports = pathParser;
