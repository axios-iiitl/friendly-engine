const createError = require("http-errors");
const User = require("../Model/User");
const { signAccessToken } = require("../Helper/JWT_helper");
const { OAuth2Client } = require("google-auth-library");
const keys = require("../config/keys");
const googleClient = new OAuth2Client(keys.clientID, keys.clientSecret);

module.exports = {
  googleauth: async (req, res, next) => {
    try {
      console.log(req.body);
      const { idToken } = req.body;
      googleClient
        .verifyIdToken({ idToken, audience: keys.clientID })
        .then((response) => {
          const { email, googleId, name } = response.payload;
          console.log(response.payload);
          User.findOne({ googleID: googleId }).then(async (currentuser) => {
            if (currentuser) {
              const accessToken = await signAccessToken(currentuser.id);
              res.send({ accessToken });
            } else {
              new User({
                username: name,
                googleID: googleId,
                email: email,
              })
                .save()
                .then(async (newuser) => {
                  console.log("new user created" + newuser);
                  const accessToken = await signAccessToken(newuser.id);
                  res.send({ accessToken });
                });
            }
          });
        })
        .catch((err) => {
          next(createError.Conflict(err));
        });
    } catch (error) {
      console.log("here ");
      console.log(error.message);
      next(createError(error));
    }
  },
};
