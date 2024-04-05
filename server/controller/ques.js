
const InterviewQuestions = require('../models/interview');

async function fetchQuestionsByKeywords(keywords) {
    try {
        // Query the database for questions where the topic matches one of the keywords
        const matchingQuestions = await InterviewQuestions.find({ topic: { $in: keywords } });

        return matchingQuestions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}

function extractKeywords(resumeText) {
    // Predefined skills
    const predefinedSkills = [
        "java", "C++", "cpp", "c/c++", "C", "Python", "JavaScript", "HTML", "CSS", "React", "Angular", "Vue.js",
        "SQL", "MySQL", "PostgreSQL", "MongoDB", "Data Structures", "Algorithms", "Object-Oriented Programming",
        "Git", "GitHub", "GitLab", "Software Development Life Cycle", "Agile Methodologies", "RESTful APIs",
        "Microservices Architecture", "AWS", "Azure", "Google Cloud Platform", "CI/CD", "Docker", "Kubernetes",
        "Test-Driven Development", "Machine Learning", "Deep Learning", "Data Analysis", "Data Visualization",
        "Natural Language Processing", "Big Data Technologies", "Hadoop", "Spark", "Statistical Analysis", "Mathematics",
        "Blockchain Development", "iOS", "Android", "React Native", "Cybersecurity", "Quality Assurance", "User Experience Design",
        "Software Architecture", "Design Patterns", "Scalability", "Performance Optimization", "Linux", "Unix", "Windows",
        "Problem-Solving", "Critical Thinking", "django", "Node.js", "Express"
    ];

    // Convert resume text to lowercase for case-insensitive comparison
    const lowercaseResumeText = resumeText.toLowerCase();

    // Initialize a Set to store unique keyword counts
    const keywordCounts = new Set();

    // Iterate over predefined skills and count occurrences in the resume text
    predefinedSkills.forEach(skill => {
        const escapedSkill = escapeRegExp(skill);
        const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi'); // Case-insensitive match
        const matches = lowercaseResumeText.match(regex) || [];
        matches.forEach(match => keywordCounts.add(match));
    });

    // Convert Set to array
    const keywords = Array.from(keywordCounts);

    // Return all keywords found in the resume
    return keywords;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = {
    fetchQuestionsByKeywords,
    extractKeywords,
    escapeRegExp
}