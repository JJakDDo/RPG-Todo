const Todo = require("../models/Todo");
const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");

const addTodo = async (req, res) => {
  const name = req.user.name;
  console.log(req.body);
  const exp = Math.round(Math.random() * 10 + 10);
  const addedTodo = await Todo.create({ name, exp, todo: req.body.todo });
  console.log(exp);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "success", exp, todo: addedTodo });
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

const completeTodo = async (req, res) => {
  const {
    user: { name },
    params: { id: todoId },
  } = req;

  const todo = await Todo.findByIdAndUpdate(
    { _id: todoId, createdBy: name },
    { isComplete: true },
    { new: true }
  );

  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo with id ${todoId}` });
  }

  const user = await Account.findOne({ name });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with name ${name}` });
  }

  const { experience, requiredExperience, level } = user;
  let account;
  if (experience + todo.exp >= requiredExperience) {
    account = await Account.findOneAndUpdate(
      { name },
      {
        level: level + 1,
        experience: experience + todo.exp - requiredExperience,
        requiredExperience: requiredExperience + 50,
      },
      {
        returnDocument: "after",
      }
    );
  } else {
    account = await Account.findOneAndUpdate(
      { name },
      {
        experience: experience + todo.exp,
      },
      {
        returnDocument: "after",
      }
    );
  }

  // 투두를 완료하면 새롭게 업데이트된 유저의 정보를 응답으로 보내준다.
  res.status(StatusCodes.OK).json({
    msg: "success",
    user: {
      level: account.level,
      exp: account.experience,
      requiredExp: account.requiredExperience,
    },
  });
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
  //const filter = req.body.filter;
  const filter = { isComplete: false };
  const todos = await Todo.find({ name, ...filter });
  res.status(StatusCodes.OK).json({ data: todos });
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const todo = await Todo.findById({ _id: id });
  res.status(StatusCodes.OK).json({ data: todo });
};

module.exports = {
  addTodo,
  deleteTodo,
  completeTodo,
  updateTodo,
  getTodos,
  getTodo,
};
