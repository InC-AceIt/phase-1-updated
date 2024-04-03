const express = require('express');
const router = express.Router();
const { getProblems } = require("../controller/problems");


router.get("/problems", getProblems);

module.exports = router;