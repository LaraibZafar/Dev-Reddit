const express = require("express");
const router = express.Router();

//@route   GET api/profile
//@access  Public => you need to be authorized to access this route
router.get("/", (req, res) => res.send("Profile Route"));

module.exports = router;
