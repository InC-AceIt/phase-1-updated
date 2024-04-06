// personalized.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const pdfParse = require('pdf-parse');
const upload = multer({ storage: storage });

const { fetchQuestionsByKeywords, extractKeywords } = require('../controller/ques');


const {
  getUserProblems,
  getUserAnalysis,
} = require("../controller/personalized");
const { getProblems } = require('../controller/problems');

router.get("/problems", getUserProblems);
router.get("/analysis", getUserAnalysis);
router.get('/problemset', getProblems)
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        // Parse the uploaded PDF file
        const data = await pdfParse(req.file.buffer);

        // Extract text from the PDF
        const resumeText = data.text;
        // Extract keywords from the resume text
        const keywords = extractKeywords(resumeText);

        // Fetch questions based on keywords
        const matchingQuestions = await fetchQuestionsByKeywords(keywords);

        // Send the extracted keywords and matching questions as a response
        res.json({ keywords, matchingQuestions });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
