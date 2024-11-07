import React, { useEffect, useState } from 'react';
import './stock.css';

function Stock() {
  const [stockData, setStockData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [medicineId, setMedicineId] = useState('');
  const [newPrice, setNewPrice] = useState('');

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

  const handleChangePriceClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdatePrice = () => {
    // Implement API call here to update the price
    console.log('Updating price for Medicine ID:', medicineId, 'New Price:', newPrice);
    // Reset the input fields and close the modal
    setMedicineId('');
    setNewPrice('');
    setShowModal(false);
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
            <th>Unit Sale Price</th>
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
              Medicine ID:
              <input
                type="text"
                value={medicineId}
                onChange={(e) => setMedicineId(e.target.value)}
              />
            </label>
            <label>
              New Price:
              <input
                type="text"
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
