const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

const UserModel = require("../../models/User");
//@route   POST api/users
//@desc    Register User
//@access  Public => you need to be authorized to access this route
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password should have 8 or more characters").isLength({
      min: 8,
    }),
  ],
  //validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    //registeration
    try {
      //check => user already exists?
      let user = await UserModel.findOne({ email });
      if (user) {
        //sending an array of errors
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200", //size of the avatar
        r: "pg", //no nudity
        d: "mm", //if the user doesnt have one just return a default avatar
      });

      //create a new instance in accordance to the User Model
      user = new UserModel({
        name,
        email,
        avatar,
        password,
      });

      //encrypt the password
      const salt = await bcrypt.genSalt(10);
      //salt is the random string that goes in with your password to be hashed
      //10 = salt round => the amount of rounds of hashes to be run to generate the salt
      //higher => safer but takes more time
      user.password = await bcrypt.hash(password, salt);

      //store the user into the database
      await user.save();

      //JWT authentication
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
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
