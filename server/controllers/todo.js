const Todo = require("../models/Todo");
const { StatusCodes } = require("http-status-codes");

const addTodo = async (req, res) => {
  const name = req.user.name;
  const addedTodo = await Todo.create({ name, todo: req.body.todo });
  res.status(StatusCodes.CREATED).json({ msg: "success", todo: addedTodo });
};

const deleteTodo = async (req, res) => {
  const {
    user: { name },
    params: { id: todoId },
  } = req;
  const todo = await Todo.findByIdAndRemove({ _id: todoId, name });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo with id ${todoId}` });
  }
  res.status(StatusCodes.OK).json({ msg: "success" });
};

const updateTodo = async (req, res) => {
  const {
    user: { name },
    params: { id: todoId },
  } = req;

  const todo = await Todo.findByIdAndUpdate(
    { _id: todoId, createdBy: name },
    req.body,
    { new: true }
  );

  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo with id ${todoId}` });
  }
  res.status(StatusCodes.OK).json({ msg: "success" });
};

const getTodos = async (req, res) => {
  const name = req.user.name;
  const filter = req.body.filter;
  const todos = await Todo.find({ name, ...filter });
  res.status(200).json({ data: todos });
};

module.exports = {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
};
