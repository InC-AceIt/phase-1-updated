const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, logout, sendOTP } = require('../controller/user.js');
const { generateToken } = require('../services/authentication.js');


router.post('/login', loginUser);

router.post('/signup', signUpUser, sendOTP, async (req, res) => {
    await req.newUser.save();
    const token = generateToken(req.body);
    res.cookie('authToken', token, { httpOnly: true });
    res.redirect('/home');
});

router.get('/logout', logout);

module.exports = router;
