const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, logout, sendOTP } = require('../controller/user.js');
const { generateToken } = require('../services/authentication.js');


router.post('/login', loginUser);

router.post('/signup', signUpUser, sendOTP);

router.post("/verify/otp", async(req,res)=>{
    if(req.cookie.otp !== req.body.otp.json()) {
        res.json({"ok":false});
    };
    await req.newUser.save();
    const token = generateToken(req.newUser);
    res.cookie('authToken', token, { httpOnly: true });
    res.json({"ok" : true});
})
router.get('/logout', logout);

module.exports = router;
