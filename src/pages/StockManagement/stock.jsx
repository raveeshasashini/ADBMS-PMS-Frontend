import React, { useEffect, useState } from 'react';
import './stock.css';

function Stock() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Parse the stored JSON object to get branch_id
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.branch_id) {
      const branchId = user.branch_id;
      console.log('Branch ID:', branchId);  
      // Fetch data from the API using the branchId
      fetch(`http://localhost:8080/api/stock/getstocksinbranch/${branchId}`)
        .then(response => response.json())
        .then(data => setStockData(data))
        .catch(error => console.error('Error fetching stock data:', error));
    } else {
      console.error('Branch ID not found in user data');
    }
  }, []);

  return (
    <div className="stock-table">
      <h3>All Stock Details</h3>
      <button className="add-stock">Remove Stock</button>
      <button className="add-stock">Change Sale Price</button>
      <table>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Medicine Name</th>
            <th>Unit Type</th>
            <th>Dose</th>
            <th>Stock Quantity</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map(stock => (
            <tr key={stock.stock_id}>
              <td>{stock.stock_id}</td>
              <td>{stock.medicine_name}</td>
              <td>{stock.unit_type}</td>
              <td>{stock.dose}</td>
              <td>{stock.stock_quantity}</td>
              <td>{stock.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;
