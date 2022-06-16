const express = require("express");
const router = express.Router();
const {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
} = require("../controllers/todo");

router.route("/:id").patch(updateTodo).delete(deleteTodo);
router.route("/").get(getTodos).post(addTodo);

module.exports = router;
