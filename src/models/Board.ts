import { v4 as uuidv4 } from 'uuid';

export interface IColumns {
  id: string;

  title: string;

  order: number;
}

export interface IBoard {
  id: string;

  title: string;

  columns: IColumns[];
}

export class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumns[];

  constructor({ id = uuidv4(), title, columns }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
