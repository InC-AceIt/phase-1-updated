const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_TOKEN_KEY;

function generateToken(user) {
    const payload = {
        username: user.username,
        password: user.password,
        email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

function generateOTP() {
    let otp = '';
    const length = 6;
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

module.exports = { generateToken, verifyToken, generateOTP };
