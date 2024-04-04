import React from 'react'
import DSAPieChart from '../components/DSAPieChart';
import { useState,useEffect } from 'react';
import RatingBarChart from '../components/RatingBarChart';



const AnalyzeProf = () => {

  const [tags, setTags] = React.useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    // Fetch tags from your backend API
    const fetchTags = async () => {
      const res = await fetch('---');
      const data = await res.json();
      setTags(data);
    };
    fetchTags();
    const fetchData = async () => {
      const response = await fetch('--');
      const data = await response.json();
      setRatingData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
    <div>
      <h1>DSAPieChart </h1>
      {tags.length > 0 && <DSAPieChart tags={tags} />}
    </div>
    <div>
      <h1>Bar Chart</h1>
      <RatingBarChart ratingData={ratingData} />
    </div>
  
    </div>
    
  )
}

export default AnalyzeProf