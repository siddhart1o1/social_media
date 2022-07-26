const router = require("express").Router();
const User = require("../models/User");

router.get("/user", async (req, res) => {
  console.log("SEARCHING")
  try {
    const data = await User.find({ username: { $regex: req.query.q } });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;