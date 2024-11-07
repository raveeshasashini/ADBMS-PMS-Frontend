import React, { useEffect, useState } from 'react';
import './stockreturn.css';

function StockReturn() {
  

  return (
    <div className="stock-table">
      <h3>All Stock Details</h3>
      <button className="add-stock" onClick={handleChangePriceClick}>Change Sale Price</button>
      
      <table>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Medicine Name</th>
            <th>Unit Type</th>
            <th>Dose</th>
            <th>Stock Quantity</th>
            <th>Unit Sale Price (RS.)</th>
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
              <td>{parseFloat(stock.unit_price).toFixed(2)}</td> {/* Formatting as double with 2 decimals */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating sale price */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Change Sale Price</h3>
            <label>
              Select Medicine:
              <select
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
              >
                <option value="">Select a medicine</option>
                {stockData.map(stock => (
                  <option
                    key={stock.stock_id}
                    value={stock.stock_id}
                  >
                    {stock.stock_id} - {stock.medicine_name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              New Price:
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </label>
            <button onClick={handleUpdatePrice}>Update Price</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReturn;
