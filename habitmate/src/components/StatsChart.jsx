// src/components/StatsChart.jsx

import React from "react";
import { Line } from "react-chartjs-2"; // مثال لاستخدام مكتبة الرسوم البيانية

const StatsChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Statistics Overview</h2>
      <Line data={data} />
    </div>
  );
};

export default StatsChart;  // تأكد من أن هذه السطر موجود
