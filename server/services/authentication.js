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

module.exports = { generateToken, verifyToken };
