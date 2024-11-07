import React, { useEffect, useState } from 'react';
import './stock.css';

function Stock() {
  const [stockData, setStockData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Fetch stock data when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.branch_id) {
      const branchId = user.branch_id;
      console.log('Branch ID:', branchId);  
      fetch(`http://localhost:8080/api/stock/getstocksinbranch/${branchId}`)
        .then(response => response.json())
        .then(data => setStockData(data))
        .catch(error => console.error('Error fetching stock data:', error));
    } else {
      console.error('Branch ID not found in user data');
    }
  }, []);

  // Open modal to change price
  const handleChangePriceClick = () => {
    setShowModal(true);
  };

  // Close modal and reset fields
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedicine('');
    setNewPrice('');
  };

  // Update price and refresh the stock table
  const handleUpdatePrice = () => {
    if (!selectedMedicine || !newPrice) {
      alert('Please select a medicine and enter a new price.');
      return;
    }

    console.log('Updating price for Medicine ID:', selectedMedicine, 'New Price:', newPrice);

    // API call to update price using Spring Boot endpoint
    fetch('http://localhost:8080/api/stock/updatesaleprice?medicineId=' + selectedMedicine + '&newPrice=' + newPrice, {
      method: 'PUT',
    })
    .then(response => response.text()) // Expecting a text response from the backend (the result message)
    .then(message => {
      alert(message); // Show success/failure message
      setSelectedMedicine('');
      setNewPrice('');
      setShowModal(false); // Close the modal

      // Refresh stock data after price update
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.branch_id) {
        const branchId = user.branch_id;
        fetch(`http://localhost:8080/api/stock/getstocksinbranch/${branchId}`)
          .then(response => response.json())
          .then(data => setStockData(data))
          .catch(error => console.error('Error fetching updated stock data:', error));
      }
    })
    .catch(error => {
      console.error('Error updating price:', error);
      alert('Failed to update price.');
    });
  };

  return (
    <div className="stock-table">
      <h3>All Stock Details</h3>
      <button className="add-stock">Remove Stock</button>
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
              <td>{stock.unit_price}</td>
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

export default Stock;
