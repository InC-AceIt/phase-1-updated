import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const DSAPieChart = ({ tags }) => {
  // Transform the tags data into a format suitable for PieChart
  const data = tags.map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

// Define a color palette for the pie chart
const COLORS = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c',
  '#9b59b6', '#fb6964', '#342224', '#472e32', '#b33939',
  '#e74c3c', '#2ecc71', '#3498db', '#95a5a6', '#f1c40f',
  '#e040fb', '#d35400', '#f39c12', '#2c3e50', '#bdc3c7'
];

export default DSAPieChart;
