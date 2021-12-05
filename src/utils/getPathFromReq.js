const pathParser = (req) => {
  try {
    const path_full = req.url.split("/").slice(1);
    const [path, user_id] = path_full;
    return user_id;
  } catch (error) {
    throw error;
  }
};

module.exports = pathParser;
