const mongoose = require('mongoose');

// Define the schema for the InterviewQuestions collection
const questionSchema = new mongoose.Schema({
  ques: String,
  topic: String,
});

const InterviewQuestions = mongoose.model('InterviewQuestions', questionSchema);

module.exports = InterviewQuestions;