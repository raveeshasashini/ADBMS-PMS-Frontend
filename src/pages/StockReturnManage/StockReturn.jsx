import React, { useEffect, useState } from 'react';
import './stockreturn.css';

function StockReturn() {
  const [inventoryData, setInventoryData] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Get branch_id from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.branch_id) {
      setBranchId(user.branch_id);
      fetchInventoryData(user.branch_id);
    }
  }, []);

  const fetchInventoryData = async (branch_id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getInventory/getallInventory/${branch_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory data');
      }
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleReturn = (inventory) => {
    setSelectedInventory(inventory);
    setShowPopup(true);
  };

  const handleReturnSubmit = () => {
    // Implement the logic for returning the stock here
    console.log(`Returning ${quantity} of inventory ID: ${selectedInventory.inventory_id}`);
    // TODO: Add backend interaction to handle the return action
    setShowPopup(false);
    setQuantity('');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setQuantity('');
  };

  return (
    <div className="stock-return-table">
      <h3>Stocks Near to Expiration</h3>
      <table>
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>Medicine Name</th>
            <th>Received Date</th>
            <th>Expiry Date</th>
            <th>Supplier ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.length > 0 ? (
            inventoryData.map((item) => (
              <tr key={item.inventory_id}>
                <td>{item.inventory_id}</td>
                <td>{item.medicine_name}</td>
                <td>{item.received_date}</td>
                <td>{item.expiry_date}</td>
                <td>{item.supplier_id}</td>
                <td>
                  <button onClick={() => handleReturn(item)} className="stock-return-button">
                    Return
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No inventory data found for this branch.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup for returning stock */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Return Stock</h3>
            <form>
              <label>
                Medicine Name:
                <input type="text" value={selectedInventory.medicine_name} readOnly />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </label>
              <div className="popup-buttons">
                <button type="button" onClick={handleReturnSubmit} className="return-button">Return</button>
                <button type="button" onClick={handleClosePopup} className="close-button">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReturn;
