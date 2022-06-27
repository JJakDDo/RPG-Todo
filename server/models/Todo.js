const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Name"],
    maxLength: 50,
    minLength: 3,
  },
  todo: {
    type: String,
  },
  exp: {
    type: Number,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
