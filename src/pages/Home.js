import React from 'react';
import PayPalDonateButton from '../components/PaypalDonateButton'; // Correct import

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center p-6 max-w-lg bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Financial Data Analytics</span>
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Analyze financial reports with advanced AI-driven insights.
        </p>
        <a
          href="/upload"
          className="inline-block bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Upload Your Report
        </a>
        
        {/* Ensure the PayPalDonateButton is properly included */}
        <PayPalDonateButton />
      </div>
    </div>
  );
};

export default Home;

