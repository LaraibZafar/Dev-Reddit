const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route   GET api/profile/myUserID(JWT)
//@desc    GET current users profile.
//@access  Private
router.get("/token", auth, async (req, res) => {
  try {
    const profile = await await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("GET PROFILE ERROR");
  }
});

module.exports = router;
