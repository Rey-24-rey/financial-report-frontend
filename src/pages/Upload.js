// src/pages/Upload.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]?.name || '');
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
      <Link to="/analysis">
        <button className="analyze-btn">Analyze Report</button>
      </Link>
    </div>
  );
};

export default Upload;

