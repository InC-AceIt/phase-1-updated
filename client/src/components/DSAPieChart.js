import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const DSAPieChart = ({ tags }) => {
  // Transform the tags data into a format suitable for PieChart
  const data = tags.map((tag) => {
    return { name: tag.name, value: tag.count };
  });

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
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
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'];

export default DSAPieChart;