import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RatingBarChart = ({ ratingData }) => {
  // Filter out entries with null or undefined acceptanceRatio values
  const filteredData = ratingData.filter(entry => entry[1] != null);

  // Convert string values to numbers for the chart
  const data = filteredData.map(entry => ({
    rating: entry[0],
    acceptanceRatio: parseFloat(entry[1])
  }));

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="rating" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="acceptanceRatio" fill="#82ca9d" />
    </BarChart>
  );
};

export default RatingBarChart;
