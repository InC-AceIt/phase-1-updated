const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const problems = require("./routes/problems.js");
const personalized = require("./routes/personalized.js");
const user = require("./routes/user");
const { authenticateUser } = require("./middleware/authentication.js"); // Import authentication middleware
const app = express();

const PORT = process.env.PORT || 5000;

// Connect to Mongodb
mongoose.connect(process.env.DBM_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Problems for all
app.use("/", problems);

// User Pages -> login, signup
app.use("/user", user);

// Personalized Problems, Analysis - Protected by authentication
app.use("/profile", authenticateUser, personalized); // Apply authentication middleware to "/profile" route

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
