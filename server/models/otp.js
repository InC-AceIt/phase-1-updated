const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email : String,
    otp: Number
});

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;

