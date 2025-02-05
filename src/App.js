import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
              
              {/* New Required Data & Output Section */}
              <div className="required-data-output">
                <h2>Required Data & Output</h2>
                <p><strong>Required Data:</strong></p>
                <ul>
                  <li><strong>Product:</strong> The name or identifier of the product being sold.</li>
                  <li><strong>Date:</strong> The date of the sale.</li>
                  <li><strong>Sales:</strong> The sales value for that specific product on the given date.</li>
                </ul>

                <p><strong>Expected Output:</strong></p>
                <ul>
                  <li>Total Sales</li>
                  <li>Sales per Product</li>
                  <li>Products with Lower Sales</li>
                  <li>Sales Growth Analysis (Daily, Weekly, Monthly, Yearly)</li>
                  <li>Profit/Loss Analysis</li>
                </ul>
              </div>

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





