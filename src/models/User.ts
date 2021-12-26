import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id?: string;

  name: string;

  login: string;

  password: string;
}

export class User implements IUser {
  id?: string;

  name: string;

  login: string;

  password: string;

  constructor({ id = uuidv4(), name, login, password }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
