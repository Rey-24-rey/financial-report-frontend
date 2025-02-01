import React, { useEffect, useState } from "react";
import "./FinancialAnalysis.css";  // Ensure this CSS file exists

const FinancialAnalysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get-data");
        const result = await response.json();
        console.log("Fetched Data:", result);
        setData(result);
        console.log("State Data in React:", data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="loading-message">Loading...</div>;
  }

  const renderTable = (tableData, title) => {
    if (!tableData || !tableData.rows || tableData.rows.length === 0) {
      return <p>No data available for {title}.</p>;
    }
    return (
        <div className="table-container">
          <h2>{title}</h2>
          <table className="styled-table">
            <thead>
              <tr>
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
          <p className="summary-text"><strong>{tableData.summary || ""}</strong></p>
        </div>
      );
    };
    

  return (
    <div className="financial-report">
      <h1>Financial Analysis Report</h1>
      {renderTable(data.productSales, "Product Sales")}
      {renderTable(data.profitLoss, "Profit and Loss")}
      {renderTable(data.trendData, "Sales Trend")}
    </div>
  );
};

export default FinancialAnalysis;



