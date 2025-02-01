// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import PayPalDonateButton from './components/PaypalDonateButton';
import FinancialAnalysis from './components/FinancialAnalysis';
import './App.css';
import './index.css';

function App() {
  const [isReportUploaded, setIsReportUploaded] = useState(false);

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

              <PayPalDonateButton />

              {/* Conditionally render FinancialAnalysis based on state */}
              {isReportUploaded && <FinancialAnalysis />}
            </div>
          } 
        />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;





