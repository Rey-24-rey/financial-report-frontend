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

  // Destructuring data from the backend response
  const productSales = analysisData.productSales || { headers: [], rows: [] };
  const profitLoss = analysisData.profitLoss || { headers: [], rows: [] };
  const growthAnalysis = analysisData.growthAnalysis || {};
  const lowSalesProducts = analysisData.lowSalesProducts || { headers: [], rows: [] };

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

  // Chart data for product sales
  const productSalesChartData = {
    labels: productSales.rows.map(row => row[0]), // Products as labels
    datasets: [
      {
        label: "Sales Volume",
        data: productSales.rows.map(row => row[1]), // Total Sales data
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      }
    ],
  };

  // Chart data for low sales products
  const lowSalesChartData = {
    labels: lowSalesProducts.rows.map(row => row[0]), // Low sales products
    datasets: [
      {
        label: "Low Sales Volume",
        data: lowSalesProducts.rows.map(row => row[1]), // Sales volume of low-sales products
        backgroundColor: "rgba(255,159,64,0.2)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
      }
    ],
  };

  // Chart data for growth analysis (daily, weekly, monthly, yearly)
  const growthChartData = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [
      {
        label: "Sales Growth (%)",
        data: [
          growthAnalysis.daily_growth?.reduce((a, b) => a + b, 0) * 100 || 0,
          growthAnalysis.weekly_growth?.reduce((a, b) => a + b, 0) * 100 || 0,
          growthAnalysis.monthly_growth?.reduce((a, b) => a + b, 0) * 100 || 0,
          growthAnalysis.yearly_growth?.reduce((a, b) => a + b, 0) * 100 || 0,
        ],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      }
    ],
  };

  return (
    <div className="container">
      <h2>Financial Analysis Results</h2>
      
      {/* Render Profit and Loss table */}
      {renderTable(profitLoss, "Profit and Loss Summary")}
      
      {/* Render Product Sales data table */}
      {renderTable(productSales, "Product Sales Data")}

      <div className="chart-section">
        <h3>Product Sales Chart</h3>
        <Bar data={productSalesChartData} />
      </div>

      <div className="chart-section">
        <h3>Low to High Sales Products Chart</h3>
        <Bar data={lowSalesChartData} />
      </div>

      <div className="chart-section">
        <h3>Sales Growth Analysis</h3>
        <Line data={growthChartData} />
      </div>
    </div>
  );
};

export default FinancialAnalysis;



