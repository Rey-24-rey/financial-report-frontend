import React from "react";
import { Line, Bar } from "react-chartjs-2"; // Assuming Chart.js is used for graphs
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = ({ analysisData }) => {
  // Check if analysisData is available and has the required properties
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

  const profitLoss = analysisData.profitLoss || 0;
  const trendData = analysisData.trendData || { trend: 'N/A', dates: [], values: [] };
  const productSales = analysisData.productSales || { products: [], sales: [] };

  // Chart data for trend analysis (line graph)
  const trendChartData = {
    labels: trendData.dates,
    datasets: [
      {
        label: 'Profit Trend',
        data: trendData.values,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ],
  };

  // Chart data for product sales (bar graph)
  const productSalesChartData = {
    labels: productSales.products,
    datasets: [
      {
        label: 'Sales Volume',
        data: productSales.sales,
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
        
        {/* Profit and Loss Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold">Profit/Loss</h3>
          <p className="text-lg"><strong>Total Profit/Loss:</strong> {profitLoss}</p>
        </div>

        {/* Trend Analysis Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold">Trend Analysis</h3>
          <p className="text-lg"><strong>Growth Trend:</strong> {trendData.trend}</p>
          
          {/* Trend Analysis Chart */}
          <div className="w-full h-72">
            <Line data={trendChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Most Purchased Products Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-semibold">Most Purchased Products</h3>
          <div className="space-y-2">
            {productSales.products.map((product, index) => (
              <p key={index}>
                <strong>{product}</strong>: {productSales.sales[index]} units sold
              </p>
            ))}
          </div>
          
          {/* Product Sales Chart */}
          <div className="w-full h-72">
            <Bar data={productSalesChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Additional Sections as Needed */}
      </div>
    </div>
  );
};

export default Analysis;


