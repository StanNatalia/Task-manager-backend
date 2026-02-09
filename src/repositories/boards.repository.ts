import Board from "../models/models";

export const findAll = () => Board.find({}, { boardId: 1, name: 1, _id: 0 });

export const findById = (boardId: string) => Board.findOne({ boardId });

export const findByName = (name: string) => Board.findOne({ name });

export const create = (data: any) => Board.create(data);

export const update = (boardId: string, data: any) =>
  Board.findOneAndUpdate({ boardId }, data, { new: true });

export const remove = (boardId: string) => Board.findOneAndDelete({ boardId });

export const save = (board: any) => board.save();
