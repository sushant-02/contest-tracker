const User = require("../models/User");
const Contest = require("../models/Contest");

module.exports.addContest = async (req, res) => {
  try {
    let cbody = req.body;

    const user = await User.findById(req.body.postedBy);
    if (!user) {
      return res.status(401).json({
        errors: {
          msg: "Sorry, we could not find the current user in our database. Please login again.",
        },
      });
    }

    cbody[user.username.toLowerCase()] = true;

    const contest = new Contest(cbody);
    await contest.save();

    // console.log(contest);

    return res.status(201).json({ contest });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find({}, null, {
      sort: { createdAt: -1 },
    }).populate("postedBy");

    // console.log(contests);

    return res.status(201).json({ contests });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.updateContestStatus = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    contest[req.body.user.toLowerCase()] = true;
    await contest.save();

    return res.status(201).json({ contest });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};
