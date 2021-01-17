const createError = require("http-errors");
const User = require("../Model/User");
const { signAccessToken } = require("../Helper/JWT_helper");
const jwt = require("jsonwebtoken");
const details = require("../Helper/getdetails");

module.exports = {
  googleauth: async (req, res, next) => {
    try {
      const { idToken } = req.body;
      const decoded = jwt.decode(idToken, { complete: true });
      const { email, name, picture, email_verified, hd } = decoded.payload;
      const { rollNo, year, branch } = details.getdetials(email,hd);
      User.findOne({ email }).then(async (currentuser) => {
        if (currentuser) {
          const accessToken = await signAccessToken(currentuser.id);
          res.send({ accessToken });
        } else {
          new User({
            name,
            email,
            emailVerified: email_verified,
            displayPicture: picture,
            rollNo,
            year,
            branch,
            displayname: name,
          })
            .save()
            .then(async (newuser) => {
              console.log("new user created :" + newuser);
              const accessToken = await signAccessToken(newuser.id);
              res.send({ accessToken });
            });
        }
      });
    } catch (error) {
      console.log(error.message);
      next(createError(error));
    }
  },
};
