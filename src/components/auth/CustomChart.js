import React from "react";
import { Chart } from "react-google-charts";



export const options = {

  pieHole: 0.4,
  is3D: false,
};

export default function CustomChart({ datasummary }) {

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 0],
    ["Rejected", datasummary.article_rejected_count],
    ["In-review", datasummary.article_review_count],
    ["Published",  datasummary.article_approved_count],
  ];
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
