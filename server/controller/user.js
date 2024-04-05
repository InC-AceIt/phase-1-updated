const User = require('../models/user');

const { generateToken, generateOTP } = require('../services/authentication');
const nodemailer = require('nodemailer');

async function loginUser(req, res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        //console.log(user);
        if (!user) return res.json({ "success": false })

        req.user = user;
        const token = generateToken(user);
        console.log("token ", token);
        return res.cookie('authToken', token, { httpOnly: true }).json({ "success": true });

    } catch (error) {
        console.error(error);
        return res.json({ "success": false });
    }
}

async function signUpUser(req, res, next) {
    const { username, email, password } = req.body;
    //console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            // If existing user is present, render the SignUpForm component
            return res.json({ success: false });
        }
        // Continue with user registration
        // req.newUser = new User({
        //     username: username,
        //     email: email,
        //     password: password
        // });
        return res.cookie('userData', {
            username: username,
            email: email,
            password: password
        });
    } catch (error) {
        console.error(error);
        return res.json({ success: false });
    }
}


function logout(req, res) {
    res.clearCookie('authToken');
    res.status(200).json({ success: "logged out" });
}

const sendOTP = (req, res, next) => {
    const otpValue = generateOTP();

    //console.log("email : ",req.cookies.userData.email);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: {
            name: "AceIt: Get it done!!",
            address: process.env.EMAIL_USER
        },
        to: req.cookies.userData.email,
        subject: 'Last step for the first step',
        text: `Welcome ${req.cookies.userData.username}. Your OTP for registration is: ${otpValue}`
    };

    transporter.sendMail(mailOptions)
        .then(async info => {
            // Email sent successfully, store OTP in database
            // const otp = new Otp({
            //     email: req.newUser.email, 
            //     otp: otpValue
            // });
            //console.log("otp : ",otpValue);
            return res.cookie('otp', otpValue, {
                httpOnly: true,
                secure: true,
                maxAge: 60000
            }).json({ "success": true });
            //console.log("HELLO", req.newUser.email);
            // await otp.save();
            // res.json({success : true});
            // return res.status(200).json({
            //     success: true,
            //     message: "Login Succesful",
            // });
        })
        .catch(err => {
            console.error('Error: ', err);
            return res.json({ "success": false });
        });
};

module.exports = { loginUser, signUpUser, logout, sendOTP };
