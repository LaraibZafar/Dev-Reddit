const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
//@route   GET api/profile/UserToken
//@desc    GET current users profile.
//@access  Private
router.get("/myProfile", auth, async (req, res) => {
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

//@route   POST api/profile
//@desc    Create or update a users profile
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      gitHubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //building the profile
    const profileAttributes = {};

    profileAttributes.user = req.user.id;
    if (company) profileAttributes.company = company;
    if (website) profileAttributes.website = website;
    if (location) profileAttributes.location = location;
    if (bio) profileAttributes.bio = bio;
    if (status) profileAttributes.status = status;
    if (gitHubUsername) profileAttributes.gitHubUsername = gitHubUsername;
    if (skills) {
      profileAttributes.skills = skills.split(",").map(skill => skill.trim());
    }
    //managing the social media platforms
    profileAttributes.social = {};
    if (youtube) profileAttributes.social.youtube = youtube;
    if (twitter) profileAttributes.social.twitter = twitter;
    if (facebook) profileAttributes.social.facebook = facebook;
    if (linkedin) profileAttributes.social.linkedin = linkedin;
    if (instagram) profileAttributes.social.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user: profileAttributes.user });
      if (profile) {
        //if found => Update it
        profile = await Profile.findOneAndUpdate(
          { user: profileAttributes.user },
          { $set: profileAttributes },
          { new: true });
        return res.json(profile);
      }
      //if not found => Create it and set it
      profile = new Profile(profileAttributes);
      await profile.save();
      return res.json(profile);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error : Profile / POST');
    }
  }
);

module.exports = router;
