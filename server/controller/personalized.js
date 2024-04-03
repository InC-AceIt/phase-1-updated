const axios = require('axios');

async function getUserProblems(req, res) {
  try {
    const problemsResponse = await fetch(
      "https://codeforces.com/api/problemset.problems?tags=implementation"
    );
    const problemsData = await problemsResponse.json();
    const problems = problemsData.result.problems;

    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${req.username}`
    );
    console.log("username: ",req.user.username);
    const submissionsData = await submissionsResponse.json();

    const tagFrequency = {};

    submissionsData.result.forEach((result) => {
      if (result.verdict !== "OK") {
        result.problem.tags.forEach((tag) => {
          if (!tagFrequency[tag]) {
            tagFrequency[tag] = 1;
          } else {
            tagFrequency[tag]++;
          }
        });
      }
    });

    const sortedTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map((entry) => entry[0]);

    const filteredProblems = problems
      .filter((problem) => {
        return problem.contestId && problem.index; 
      })
      .map((problem) => ({
        name: problem.name,
        link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
      }));

    res.json({ filteredProblems });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
}

async function getUserAnalysis(req, res) {
  try {
    
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${req.user.username}`);
    const submissionsData = await response.json();
    // return res.json(submissionsData);

    console.log("username: ",req.user.username);
    const acceptance = {};
    const tagFrequency = {};

   
    submissionsData.result.forEach(submission => {
      
      
        const rating = submission.problem.rating;
        const verdict = submission.verdict;

        
        if (!acceptance[rating]) {
          acceptance[rating] = { correct: 0, wrong: 0 };
        }
        if (verdict === "OK") {
          acceptance[rating].correct++;
        } else {
          acceptance[rating].wrong++;
        }

        
        if (verdict === "OK") {
          submission.problem.tags.forEach(tag => {
            if (!tagFrequency[tag]) {
              tagFrequency[tag] = 1;
            } else {
              tagFrequency[tag]++;
            }
          });
        }
      
    });

    
    for (const rating in acceptance) {
      const correct = acceptance[rating].correct;
      const wrong = acceptance[rating].wrong;
      acceptance[rating] = (correct / wrong) * 100;
    }

   
    const result = { bar: acceptance, pie: tagFrequency };
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
}





module.exports = {
  getUserProblems,
  getUserAnalysis,
};
