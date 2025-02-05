import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="title">Analysis Results</h2>
          <p className="error-message">Data not available. Please try again later.</p>
        </div>
      </div>
    );
  }

  const productSales = analysisData.productSales || { headers: [], rows: [] };
  const profitLoss = analysisData.profitLoss || { headers: [], rows: [] };
  const growthAnalysis = analysisData.growthAnalysis || {};

  // Function to render tables
  const renderTable = (tableData, title) => {
    if (!tableData || !tableData.headers || !tableData.rows.length) return <p>No data available.</p>;

    return (
      <div className="table-container">
        <h3 className="table-title">{title}</h3>
        <table className="data-table">
          <thead>
            <tr className="table-header">
              {tableData.headers.map((header, index) => (
                <th key={index} className="table-cell">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Chart data for trend analysis
  const trendChartData = {
    labels: growthAnalysis.daily_growth || [], // Display growth data if available
    datasets: [
      {
        label: 'Sales Growth (Daily)',
        data: growthAnalysis.daily_growth || [], // Sales growth (daily)
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ],
  };

  // Chart data for product sales
  const productSalesChartData = {
    labels: productSales.rows.map(row => row[0]), // First column as labels (Products)
    datasets: [
      {
        label: 'Sales Volume',
        data: productSales.rows.map(row => row[1]), // Second column as data (Total Sales)
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Analysis Results</h2>
        
        {renderTable(productSales, "Product Sales")}
        {renderTable(profitLoss, "Profit/Loss Summary")}

        <div className="chart-container">
          <h3 className="chart-title">Sales Trend (Weekly)</h3>
          <Line data={trendChartData} />
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Product Sales (Bar Chart)</h3>
          <Bar data={productSalesChartData} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;




