import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PurchaseHistoryReport() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedUser = JSON.parse(storedData);
      setUser(parsedUser);
      setBranchId(parsedUser.branch_id); // Set branchId based on stored user data
    }
  }, []);

  const handleGenerateReport = () => {
    fetch(`http://localhost:8080/api/report/purchaseHistory?branchId=${branchId}&month=${selectedMonth}&year=${selectedYear}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPurchaseData(data))
      .catch(error => console.error('Error fetching purchase history data:', error));
  };

  console.log(branchId,selectedMonth,selectedYear)

  return (
    <div style={{ height: "100%" }}>
      <h1 className="display-5 mb-4">Purchase History Report</h1>
      
      <div className="card p-4 mb-4">
        <h2 className="h4">Generate Purchase History</h2>
        <div className="d-flex gap-3 mb-3">
          
          <div>
            <label htmlFor="month" className="form-label">Select Month</label>
            <select 
              id="month" 
              className="form-select" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="year" className="form-label">Select Year</label>
            <input 
              type="number" 
              id="year" 
              className="form-control" 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ width: '100px' }} onClick={handleGenerateReport}>Generate</button>
      </div>

      <div className="card p-4">
        <h2 className="h4 mb-3">Purchase History Data</h2>
        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th>Received Date</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier Name</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData.length > 0 ? (
              purchaseData.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td> {/* Received Date */}
                  <td>{item[1]}</td> {/* Medicine Name */}
                  <td>{item[2]}</td> {/* Quantity */}
                  <td>{`Rs. ${item[3].toFixed(2)}`}</td> {/* Price */}
                  <td>{item[4]}</td> {/* Supplier Name */}
                  <td>{item[5]}</td> {/* Expiry Date */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
