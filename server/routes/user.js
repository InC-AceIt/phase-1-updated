const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, logout } = require('../controller/user.js');


router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.get('/logout', logout);

module.exports = router;
