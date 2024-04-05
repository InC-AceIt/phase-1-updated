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
    <div className='w-full h-full flex flex-col gap-y-4 items-center overflow-auto'>
      <div className=' w-2/6 border-2 border-black rounded-md p-2 flex flex-col items-center'>
        <h1 className='text-lg font-semibold'>DSAPieChart</h1>
        <DSAPieChart tags={Object.entries(pieData)} />
      </div>
      <div className=' w-3/6  border-black border-2 rounded-md p-2 flex flex-col items-center'>
        <h1 className='text-lg font-semibold'>RatingBarChart</h1>
        <RatingBarChart ratingData={Object.entries(barData)} />
      </div>
    </div>
  );
};

export default AnalyzeProf;
