const express = require("express");
const router = express.Router();

//@route   GET api/auth
//@access  Public => you need to be authorized to access this route
router.get("/", (req, res) => res.send("Auth Route"));

module.exports = router;
