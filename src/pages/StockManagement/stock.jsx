import React from 'react';
import './stock.css';



function Stock() {
  return (
    <div className="stock-table">
      <h3>All Stock Details</h3>
      <button className="add-stock">Remove Stock</button>
      <button className="add-stock">Change sale price</button>
      <table>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Medicine Name</th>
            <th>Supplier Details</th>
            <th>Unit Type</th>
            <th>Dose</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Stock;