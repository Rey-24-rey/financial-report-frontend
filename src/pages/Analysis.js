import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = ({ analysisData }) => {
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Analysis Results</h2>
          <p className="text-lg text-red-500">Data not available. Please try again later.</p>
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
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {tableData.headers.map((header, index) => (
                <th key={index} className="border border-gray-300 p-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 p-2">{cell}</td>
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Analysis Results</h2>

        {/* Profit/Loss Table */}
        {renderTable(profitLoss, "Profit and Loss Summary")}

        {/* Sales Trend Table */}
        {renderTable(trendData, "Sales Trend Data")}

        {/* Product Sales Table */}
        {renderTable(productSales, "Product Sales Data")}

        {/* Trend Analysis Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold">Trend Analysis</h3>
          <p className="text-lg"><strong>Growth Trend:</strong> {trendData.trend}</p>
          <div className="w-full h-72">
            <Line data={trendChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Product Sales Chart */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold">Product Sales Chart</h3>
          <div className="w-full h-72">
            <Bar data={productSalesChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;


