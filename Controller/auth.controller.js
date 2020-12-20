const createError = require("http-errors");
const User = require("../Model/User");
const { signAccessToken } = require("../Helper/JWT_helper");
module.exports = {
    googleauth: async (req, res, next) => {
        try {
          const { googleId, email, name } = req.body.response.profileObj;
          User.findOne({ googleID: googleId }).then(async(currentuser) => {
            if (currentuser) {
              const accessToken = await signAccessToken(currentuser.id);
              res.send({accessToken});
            } else {
              new User({
                username: name,
                googleID: googleId,
                email: email,
              })
                .save()
                .then(async(newuser) => {
                  console.log("new user created" + newuser);
                  const accessToken = await signAccessToken(newuser.id);
                  res.send({accessToken});
                });
            }
          });
        } catch (error) {
          console.log(error.message);
          next(createError(error));
        }
      },
}