const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
//@route   GET api/auth
//@access  Public => you need to be authorized to access this route
router.get("/", auth, async (req, res) => {
  try {
    //find this user id in the user ID fetch everything but the password
    const user = await UserModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error=> api/auth");
  }
});

//@route   POST api/auth
//@desc    Authenticate user and get token
router.post(
  "/",
  [
    check("email", "Email not valid").isEmail(),
    check("password", "Password is required").exists(),
  ],
  //validation
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //User => found, check whether password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //JWT authentication
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (error, token) => {
          //call back to send a token back to the client
          if (error) {
            throw error;
          } else {
            console.log("here");
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
