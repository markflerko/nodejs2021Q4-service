const uuid = require('uuid');

class User {
  constructor({ id = uuid(), name, login, password }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

exports.User = User;
