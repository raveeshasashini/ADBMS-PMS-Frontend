import React, { useEffect, useState } from 'react';
import './stock.css';

function Stock() {
  

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
            <th>Stock Quantity</th>
            <th>Unit Price</th>
            <th>Branch Details</th>
            <th>Actions</th>
          </tr>
        </thead>
    
      </table>
    </div>
  );
}

export default Stock;
