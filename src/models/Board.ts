const uuidBoard = require('uuid');

interface IColumns {
  id: string;

  title: string;

  order: number;
}

interface IBoard {
  id: string;

  title: string;

  columns: IColumns[];
}

class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumns[];

  constructor({ id = uuidBoard(), title, columns }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

exports.Board = Board;
