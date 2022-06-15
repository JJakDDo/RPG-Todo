const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Name"],
    maxLength: 50,
    minLength: 3,
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
    minLength: 6,
  },
});

AccountSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AccountSchema.methods.comparePassword = async function (givenPassword) {
  const isMatch = await bcrypt.compare(givenPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Account", AccountSchema);
