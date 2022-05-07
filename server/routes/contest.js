const express = require("express");
const router = express.Router();

const contestController = require("../controllers/contest.controller");

router.get("/contest/all", contestController.getAllContests);
router.patch("/contest/update/:id", contestController.updateContestStatus);
router.post("/contest/new", contestController.addContest);

module.exports = router;
