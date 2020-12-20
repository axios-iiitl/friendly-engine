const express = require("express");
const app = express();
const createError = require("http-errors");
const morgan = require("morgan");
const authRoutes = require("./Routes/Auth");
const cors = require("cors");

require("dotenv").config();
const { Port } = process.env;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/auth", authRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound("this route doesnot exist"));
  });

app.listen(Port || 3000, () => {
  console.log(`Server started at port ${Port || 3000} 🚀🚀`);
});
