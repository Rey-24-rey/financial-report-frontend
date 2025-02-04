import React from "react";
import { Line, Bar } from "react-chartjs-2";

const FinancialAnalysis = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="container">
        <p>No analysis data available.</p>
      </div>
    );
  }

  const trendData = analysisData.trendData || { headers: [], rows: [] };
  const productSales = analysisData.productSales || { headers: [], rows: [] };
  const profitLoss = analysisData.profitLoss || { headers: [], rows: [] };

  const renderTable = (tableData, title) => {
    if (!tableData || !tableData.headers || !tableData.rows.length) return <p>No data available.</p>;

    return (
      <div className="table-container">
        <h3 className="table-title">{title}</h3>
        <table className="data-table">
          <thead>
            <tr className="table-header">
              {tableData.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
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
      <h2>Analysis Results</h2>
      {renderTable(profitLoss, "Profit and Loss Summary")}
      {renderTable(trendData, "Sales Trend Data")}
      {renderTable(productSales, "Product Sales Data")}

      <div className="chart-section">
        <h3>Trend Analysis</h3>
        <Line data={trendChartData} />
      </div>

      <div className="chart-section">
        <h3>Product Sales Chart</h3>
        <Bar data={productSalesChartData} />
      </div>
    </div>
  );
};

export default FinancialAnalysis;



