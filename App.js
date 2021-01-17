const express = require("express");
const app = express();
const createError = require("http-errors");
const morgan = require("morgan");
const authRoutes = require("./Routes/Auth");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/auth", authRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound("this route doesnot exist"));
  });

app.listen(PORT || 3000, () => {
  console.log(`Server started at port ${PORT || 3000} 🚀🚀`);
});
