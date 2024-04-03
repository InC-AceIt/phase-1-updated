const User = require('../models/User');
const { generateToken, generateOTP } = require('../services/authentication');
const nodemailer = require('nodemailer');

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        console.log(user);
        if (!user) return res.status(401).send('Invalid credentials');

        req.user = user;
        const token = generateToken(user);
        console.log("token ", token);
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function signUpUser(req, res, next) {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: email });
        console.log(existingUser);
        if (existingUser)
            return res.status(400).send('Email already exists');
        // return to registration page

        req.newUser = new User({
            username: username,
            email: email,
            password: password
        });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Signup Failed' });
    }
}

function logout(req, res) {
    res.clearCookie('authToken');
    res.status(200).json({ success: "logged out" });
}

const sendOTP = (req, res) => {
    const otp = generateOTP();
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
        to: req.newUser.email,
        subject: 'Last step for the first step',
        text: `Welcome ${req.newUser.username}. Your OTP for registration is: ${otp}`
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email sent: ', info.response);
            res.cookie('otp', otp, {
                httpOnly: true,
                secure: true,
                maxAge: 600000
            })
            // send to otp entering page
        })
        .catch(err => {
            console.error('Error: ', err);
        });
};

module.exports = { loginUser, signUpUser, logout, sendOTP };
