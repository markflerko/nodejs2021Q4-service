const { database } = require('../../repository/database');

const updatePerson = ({ id, body }) => {
  database[id] = {
    id: database[id].id,
    name: body.name ? body.name : database[id].name,
    login: body.login ? body.login : database[id].login,
    password: body.password ? body.password : database[id].password,
  };
  console.log(database[id]);
  return database[id];
};

module.exports = updatePerson;
