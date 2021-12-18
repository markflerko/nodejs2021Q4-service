const uuidUser = require('uuid');

interface IUser {
  id: string;

  name: string;

  login: string;

  password: string;
}

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ id = uuidUser(), name, login, password }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

exports.User = User;
