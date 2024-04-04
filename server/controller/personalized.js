const axios = require('axios');

async function getUserProblems(req, res) {
  try {
    // Fetch all problems from the Codeforces API
    const problemsResponse = await fetch("https://codeforces.com/api/problemset.problems");
    const problemsData = await problemsResponse.json();
    const problems = problemsData.result.problems;

    // Calculate average rating of last 100 submissions
    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${req.user.username}`
    );
    const submissionsData = await submissionsResponse.json();

    const last100Submissions = submissionsData.result
      .filter((submission, index) => index < 100)
      .map(submission => submission.problem.rating)
      .filter(rating => rating !== undefined); // Filter out undefined ratings

    const avgRating = last100Submissions.reduce((total, rating) => total + rating, 0) / last100Submissions.length;

    // Extract tags from submissions where verdict is not "OK"
    const tagFrequency = {};
    submissionsData.result.forEach((result) => {
      if (result.verdict !== "OK") {
        result.problem.tags.forEach((tag) => {
          tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
        });
      }
    });

    // Get tags with maximum frequency
    const sortedTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map((entry) => entry[0]);

    // Filter problems based on tags and ratings
    const filteredProblems = problems.filter(problem => {
      const problemTags = new Set(problem.tags);
      const matchingTagsCount = sortedTags.reduce((count, tag) => {
        if (problemTags.has(tag)) {
          count++;
        }
        return count;
      }, 0);
      
      return (
        problem.rating !== undefined &&
        matchingTagsCount >= 2 &&  // At least two tags from sortedTags
        Math.abs(problem.rating - avgRating) <= 150
      );
    });

    // Format the filtered problems
    const formattedProblems = filteredProblems.map(problem => ({
      name: problem.name,
      link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
    }));

    res.json({ avgRating, filteredProblems: formattedProblems });
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
