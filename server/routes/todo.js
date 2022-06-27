const express = require("express");
const router = express.Router();
const {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
  completeTodo,
} = require("../controllers/todo");

router.route("/:id").patch(updateTodo).delete(deleteTodo).post(completeTodo);
router.route("/").get(getTodos).post(addTodo);

module.exports = router;
