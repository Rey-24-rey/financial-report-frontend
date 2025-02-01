import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import PayPalDonateButton from './components/PaypalDonateButton'; // Import PayPalDonateButton component
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <h1>Welcome to Financial Data Analytics</h1>
            <p>Analyze financial reports with advanced AI-driven insights.</p>
            <button className="upload-btn">
              <a href="/upload">Upload Your Report</a>
            </button>

            {/* Add PayPalDonateButton here */}
            <PayPalDonateButton />
          </div>
        } />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;




