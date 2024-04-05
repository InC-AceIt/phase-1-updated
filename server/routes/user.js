const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, logout, sendOTP } = require('../controller/user.js');
const { generateToken } = require('../services/authentication.js');
const User = require('../models/User.js');


router.post('/login', loginUser);

router.post('/signup', signUpUser, sendOTP);

router.post('/refetch', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        console.log("user not found");
        return res.status(400).json({ "success": false })
    }

    const token = generateToken(user);
    console.log("token ", token);
    return res.status(200).cookie('authToken', token, { httpOnly: true, secure: true, maxAge: 8.64e+7 }).json({ "success": true });
})

router.post("/verify/otp", async (req, res) => {
    console.log("backend", req.body.otp);
    if (req.cookies.otp !== req.body.otp) {
        console.log("wrong otp");
        return res.json({ "ok": false });
    }
    console.log("otp here");
    console.log(req.cookies.userData);
    const data = req.cookies.userData;
    const user = new User(data);
    await user.save();
    const token = generateToken(data);
    res.cookie('authToken', token, { httpOnly: true });
    return res.clearCookie('otp').clearCookie('userData').json({ "ok": true });
})
router.get('/logout', logout);

module.exports = router;
