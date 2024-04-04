import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RatingBarChart = ({ ratingData }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={ratingData}
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