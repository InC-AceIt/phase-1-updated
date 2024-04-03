// personalized.js
const express = require('express');
const router = express.Router();
const {
  getUserProblems,
  getUserAnalysis,
} = require("../controller/personalized");

router.get("/problems", getUserProblems);
router.get("/analysis", getUserAnalysis);

module.exports = router;
