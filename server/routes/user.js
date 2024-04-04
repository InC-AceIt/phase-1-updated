const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, logout, sendOTP } = require('../controller/user.js');
const { generateToken } = require('../services/authentication.js');
const User = require('../models/User.js');


router.post('/login', loginUser);

router.post('/signup', signUpUser, sendOTP);

router.post("/verify/otp", async(req,res)=>{
    if(req.cookies.otp !== req.body.otp) {
        return res.json({"ok":false});
    }
    console.log("otp here");
    console.log(req.cookies.userData);
    const data = req.cookies.userData;
    const user = new User(data);
    await user.save();
    const token = generateToken(data);
    res.cookie('authToken', token, { httpOnly: true });
    return res.clearCookie('otp').clearCookie('userData').json({"ok" : true});
})
router.get('/logout', logout);

module.exports = router;
