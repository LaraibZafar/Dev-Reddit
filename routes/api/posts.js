const express = require("express");
const router = express.Router();

//@route   GET api/post
//@access  Public => you need to be authorized to access this route
router.get("/", (req, res) => res.send("Post Route"));

module.exports = router;
