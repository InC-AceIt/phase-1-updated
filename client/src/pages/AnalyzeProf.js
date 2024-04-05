import React, { useState, useEffect } from 'react';
import DSAPieChart from '../components/DSAPieChart';
import RatingBarChart from '../components/RatingBarChart';

const AnalyzeProf = () => {
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/profile/analysis');
        const data = await response.json();
        setPieData(data.pie);
        setBarData(data.bar);
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>DSAPieChart</h1>
        <DSAPieChart tags={Object.entries(pieData)} />
      </div>
      <div>
        <h1>RatingBarChart</h1>
        <RatingBarChart ratingData={Object.entries(barData)} />
      </div>
    </div>
  );
};

export default AnalyzeProf;
