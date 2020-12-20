const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
module.exports = {
  signAccessToken: (userid) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const option = {
        expiresIn: "90d",
        issuer: "Axios",
        audience: userid,
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"].split(" ");
    const token = authHeader[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError")
          return next(createError.Unauthorized());
        return next(createError.Unauthorized(err.message));
      }
      req.payload = payload;
      next();
    });
  }
};
