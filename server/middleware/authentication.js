const { verifyToken } = require('../services/authentication');

function authenticateUser(req, res, next) {
  const token = req.cookies.authToken;
  console.log("token", token);
  if (!token) {
    return res.json({ err: "wrong token" });
  }

  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
}

module.exports = { authenticateUser };
