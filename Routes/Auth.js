const express = require("express");
const router = express.Router();
const { googleauth } = require("../Controller/auth.controller");
router.post("/register", googleauth);
module.exports = router;
