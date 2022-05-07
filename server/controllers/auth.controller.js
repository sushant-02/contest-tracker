const User = require("../models/User");

module.exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
    });
    user.save();

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        errors: {
          msg: `Sorry, we could not find a user with the username '${req.body.username}'`,
        },
      });
    }

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};
