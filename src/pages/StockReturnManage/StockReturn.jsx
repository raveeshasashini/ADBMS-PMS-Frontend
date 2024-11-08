import React, { useEffect, useState } from 'react';
import './stockreturn.css';

function StockReturn() {
  const [inventoryData, setInventoryData] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [quantity, setQuantity] = useState('');

  // Format expiryDate to yyyy-mm-dd hh:mm:ss
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    // Return formatted date as yyyy-mm-dd hh:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

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
      const response = await fetch(`http://localhost:8080/api/Inventory/getallNearExpirationInventory/${branch_id}`);
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

  const handleReturnSubmit = async () => {
    // Validate the entered quantity
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    // Get the selected inventory details
    const stockQuantity = parseInt(quantity); // The quantity entered in the popup
    const medicineId = selectedInventory.medicine_id;
    const branchId = selectedInventory.branch_id;

    // Format the expiry date before sending to backend
    const expiryDate = formatDate(selectedInventory.expiry_date);

    // Log values to ensure they're correct
    console.log("Submitting Return with the following data:");
    console.log("Stock Quantity:", stockQuantity);
    console.log("Medicine ID:", medicineId);
    console.log("Branch ID:", branchId);
    console.log("Formatted Expiry Date:", expiryDate);

    // Prepare data for the API call
    const data = new URLSearchParams();
    data.append('stockQuantity', stockQuantity);
    data.append('medicineId', medicineId);
    data.append('branchId', branchId);
    data.append('expiryDate', expiryDate);

    try {
      // Send the POST request with the required data
      const response = await fetch('http://localhost:8080/api/Inventory/addStockArchieve', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to add stock to archive');
      }

      // Handle the response from the server
      const result = await response.text();
      console.log(result); // Display the result from the backend (optional)

      // Display success message
      alert('Stock successfully returned and archived!');

      // Refresh the inventory table
      fetchInventoryData(branchId); // Refresh the inventory list

      // Close the popup and reset quantity input
      setShowPopup(false);
      setQuantity('');
    } catch (error) {
      console.error('Error adding stock to archive:', error);

      // Display error message
      alert('Error adding stock to archive. Please try again.');
    }
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
                <button type="button" onClick={handleReturnSubmit} className="return-button">
                  Return
                </button>
                <button type="button" onClick={handleClosePopup} className="close-button">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReturn;
