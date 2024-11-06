import React, { useEffect, useState } from 'react';

export default function InventoryReport() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [branchId, setBranchId] = useState(null); // Initialize as null until user data is available

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedUser = JSON.parse(storedData);
      setUser(parsedUser);
      setBranchId(parsedUser.branch_id); // Set branchId after user is loaded
    }
  }, []);

  useEffect(() => {
    if (branchId !== null) { // Only fetch data if branchId is set
      const fetchStockData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`http://localhost:8080/api/report/stockLevel?branchId=${branchId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch stock data');
          }
          const data = await response.json();
          setStockData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchStockData();
    }
  }, [branchId]);

  return (
    <div>
      <h2>Inventory Report</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(stockData) && stockData.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">No stock data available</td>
            </tr>
          ) : (
            stockData.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
