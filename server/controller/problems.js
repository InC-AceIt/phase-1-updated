
async function getProblems(req, res) {
    try {
      const problemsResponse = await fetch(
        "https://codeforces.com/api/problemset.problems?tags=implementation"
      );
      const problemsData = await problemsResponse.json();
  
      // Extract problems from the response
      let problems = problemsData.result.problems;
  
      // Sort problems by rating, if rating is not present, sort by index
      problems.sort((a, b) => {
        if (a.rating && b.rating) {
          return a.rating - b.rating;
        } else if (!a.rating && !b.rating) {
          // If both problems have no rating, sort by index
          return a.index.localeCompare(b.index);
        } else if (!a.rating) {
          // If only 'a' has no rating, 'a' comes after 'b'
          return 1;
        } else {
          // If only 'b' has no rating, 'a' comes before 'b'
          return -1;
        }
      });
  
      // Filter top 5 problems for each distinct rating
      let filteredProblems = [];
      let ratingCount = {};
      for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];
        if (problem.contestId && problem.index) {
          // Only push problems with contestId and index present
          if (!ratingCount[problem.rating]) {
            ratingCount[problem.rating] = 1;
            filteredProblems.push({
              name: problem.name,
              link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
            });
          } else if (ratingCount[problem.rating] < 5) {
            ratingCount[problem.rating]++;
            filteredProblems.push({
              name: problem.name,
              link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
            });
          }
        }
      }
  
      // Return the filtered problems in JSON format
      
      res.json(filteredProblems);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  }
  
  module.exports = {
    getProblems,
  }