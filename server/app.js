require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const authenticateUser = require("./middlewares/authentication");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", authenticateUser, todoRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
