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

//@route   GET api/profile
//@desc    Get all profiles
//@access  Public
router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error : Profile / GET');
  }
})

//@route   GET api/profile/user/:user_id
//@desc    Get profile by user ID
//@access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'User Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User Profile not found' });
    }
    res.status(500).send('Server Error : Profile / GET');
  }
})

//@route   DELETE api/profile
//@desc    Delete a profile and the user along with their posts
//@access  Private
router.delete('/', auth, async (req, res) => {
  try {
    //TODO : DELETE User's posts

    //Delete Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Delete User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error : Profile / DELETE');
  }
})

//@route   PUT api/profile
//@desc    Add experience to a user's profile
//@access  Private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'Start data is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExperience);
    await profile.save();
    res.json(profile);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error: Put Experience');
  }
});

module.exports = router;
