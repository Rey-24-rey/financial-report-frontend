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

  const trendData = analysisData.trendData || { headers: [], rows: [] };
  const productSales = analysisData.productSales || { headers: [], rows: [] };
  const profitLoss = analysisData.profitLoss || { headers: [], rows: [] };

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
    labels: trendData.rows.map(row => row[0]), // First column as labels (Dates)
    datasets: [
      {
        label: 'Sales Trend',
        data: trendData.rows.map(row => row[1]), // Second column as data (Sales)
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

        {/* Profit/Loss Table */}
        {renderTable(profitLoss, "Profit and Loss Summary")}

        {/* Sales Trend Table */}
        {renderTable(trendData, "Sales Trend Data")}

        {/* Product Sales Table */}
        {renderTable(productSales, "Product Sales Data")}

        {/* Trend Analysis Section */}
        <div className="chart-section">
          <h3 className="chart-title">Trend Analysis</h3>
          <p className="trend-description"><strong>Growth Trend:</strong> {trendData.trend}</p>
          <div className="chart-container">
            <Line data={trendChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Product Sales Chart */}
        <div className="chart-section">
          <h3 className="chart-title">Product Sales Chart</h3>
          <div className="chart-container">
            <Bar data={productSalesChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;


