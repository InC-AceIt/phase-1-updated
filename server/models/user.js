const mongoose = require('mongoose');

mongoose.connect(process.env.DBM_CONNECTION);

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;