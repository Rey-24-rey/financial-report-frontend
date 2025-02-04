import React, { useState } from 'react';
import axios from 'axios';
import FinancialAnalysis from '../components/FinancialAnalysis'; // Import FinancialAnalysis component

import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components explicitly
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Upload = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [fileData, setFileData] = useState(null); // To hold the response data

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || '');
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError('');
    setFileData(null); // Reset previous data

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileData(response.data);  // Store the data to display
    } catch (error) {
      setError('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Your Report</h1>
      <div className="file-upload-card">
        <label htmlFor="file-upload" className="file-upload-label">
          <span>{fileName || 'Choose a file'}</span>
        </label>
        <input
          id="file-upload"
          type="file"
          className="file-upload-input"
          onChange={handleFileChange}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        className="analyze-btn"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Analyze Report'}
      </button>

      {/* Display the file data */}
      {fileData && (
        <div className="file-data">
          <h3>File Data:</h3>
          <FinancialAnalysis analysisData={fileData} /> {/* Pass the data here */}
        </div>
      )}
    </div>
  );
};

export default Upload;




