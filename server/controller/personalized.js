const axios = require('axios');
const {getProblems} = require("./problems");

// async function getUserProblems(req, res) {
//   try {
//     let submissionsData = {};

//     // Fetch submissions data from Codeforces API
//     const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${req.user.username}`);
//     submissionsData = await submissionsResponse.json();
//     const problems = submissionsData.result.problems;

//     // If submissions data is empty, get data from getProblems
//     if (!submissionsData.result || submissionsData.result.length === 0) {
//       // Call getProblems to fetch data
//       // const problemsResponse = await getProblems(); // Note: await is used here to handle the promise returned by getProblems
//       // const problemsData = await problemsResponse.json();

//       // // Send the problems data
//       // return res.json(problemsData);
//       return res.redirect('/profile/problemset');
//     }

//     // Calculate average rating of last 100 submissions
//     const last100Submissions = submissionsData.result
//       .filter((submission, index) => index < 100)
//       .map(submission => submission.problem.rating)
//       .filter(rating => rating !== undefined); // Filter out undefined ratings

//     let avgRating = last100Submissions.reduce((total, rating) => total + rating, 0) / (last100Submissions.length+1);

//     if (avgRating <= 800) {
//       avgRating = 800;
//     }

//     // Extract tags from submissions where verdict is not "OK"
//     const tagFrequency = {};
//     submissionsData.result.forEach((result) => {
//       if (result.verdict !== "OK") {
//         result.problem.tags.forEach((tag) => {
//           tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
//         });
//       }
//     });

//     // Get tags with maximum frequency
//     const sortedTags = Object.entries(tagFrequency)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 6)
//       .map((entry) => entry[0]);

//     // Filter problems based on tags and ratings
//     const filteredProblems = problems.filter(problem => {
//       const problemTags = new Set(problem.tags);
//       const matchingTagsCount = sortedTags.reduce((count, tag) => {
//         if (problemTags.has(tag)) {
//           count++;
//         }
//         return count;
//       }, 0);

//       return (
//         problem.rating !== undefined &&
//         matchingTagsCount >= 2 &&  // At least two tags from sortedTags
//         Math.abs(problem.rating - avgRating) <= 150
//       );
//     });

//     // Format the filtered problems
//     const formattedProblems = filteredProblems.map(problem => ({
//       name: problem.name,
//       link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
//     }));

//     res.json(formattedProblems);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data");
//   }
// }

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

    res.json(formattedProblems);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
}


async function getUserAnalysis(req, res) {
  try {
    const username = req.user.username.trim();
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissionsData = await response.json();

    if (submissionsData.result.length === 0) {
      return res.json({ success: false, error: "You must solve some problems for analysis" });
    }

    const acceptance = {};
    const tagFrequency = {};

    submissionsData.result.forEach(submission => {
      const rating = parseInt(submission.problem.rating);
      const verdict = submission.verdict;

      if (!isNaN(rating)) {
        if (!acceptance[rating]) {
          acceptance[rating] = { correct: 0, wrong: 0 };
        }
        if (verdict === "OK") {
          acceptance[rating].correct++;
        } else {
          acceptance[rating].wrong++;
        }

        if (verdict === "OK" && rating <= 1600) {
          submission.problem.tags.forEach(tag => {
            if (!tagFrequency[tag]) {
              tagFrequency[tag] = 1;
            } else {
              tagFrequency[tag]++;
            }
          });
        }
      } else {
        console.log("Invalid rating:", submission.problem.rating);
      }
    });

    for (const rating in acceptance) {
      const correct = acceptance[rating].correct;
      const wrong = acceptance[rating].wrong;
      acceptance[rating] = (correct / (correct + wrong)) * 100;
    }

    // Transform tagFrequency into the desired array format
    const pieData = Object.entries(tagFrequency).map(([tag, freq]) => ({ tags: tag, freq }));

    const result = { bar: acceptance, pie: pieData };
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
