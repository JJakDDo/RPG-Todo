const Account = require("../models/Account");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const account = await Account.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user: { name: account.name } });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide name and password" });
  }
  const user = await Account.findOne({ name });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
