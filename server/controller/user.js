const User = require('../models/User');
const { generateToken } = require('../services/authentication');

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) return res.status(401).send('Invalid credentials');
    
    req.user = user;
    const token = generateToken(user);
    console.log("token ",token);
    res.cookie('authToken', token, { httpOnly: true });
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function signUpUser(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) 
      return res.status(400).send('Email already exists');

    const user = new User({ 
      username: username, 
      email: email, 
      password: password 
    });
    await user.save();
    
    const token = generateToken(user);
    res.cookie('authToken', token, { httpOnly: true });
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

function logout(req, res) {
    res.clearCookie('authToken');
    res.status(200).json({success:"logged out"});
}

module.exports = { loginUser, signUpUser, logout };
