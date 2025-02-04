// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Upload from './pages/Upload'; // Assuming you have an Upload component
import Analysis from './pages/Analysis'; // Assuming you have an Analysis component
import PayPalDonateButton from './components/PaypalDonateButton'; // Assuming you have a PayPalDonateButton component
import FinancialAnalysis from './components/FinancialAnalysis'; // Import FinancialAnalysis component
import './App.css'; // Assuming you have a custom CSS file
import './index.css'; // Assuming you have an index CSS file

function App() {
  const [isReportUploaded, setIsReportUploaded] = useState(false); // Assuming you need this state for uploaded report

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="container">
              <h1>Welcome to Financial Data Analytics</h1>
              <p>Analyze financial reports with advanced AI-driven insights.</p>
              <button className="upload-btn">
                <a href="/upload">Upload Your Report</a>
              </button>

              <PayPalDonateButton /> {/* Render PayPal Donate Button */}

              {/* Conditionally render FinancialAnalysis based on state */}
              {isReportUploaded && <FinancialAnalysis />}
            </div>
          } 
        />
        <Route path="/upload" element={<Upload />} /> {/* Route to Upload page */}
        <Route path="/analysis" element={<FinancialAnalysis />} /> {/* Direct route to FinancialAnalysis page */}
      </Routes>
    </Router>
  );
}

export default App;





