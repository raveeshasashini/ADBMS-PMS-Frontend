import React, { useEffect, useState } from 'react';

export default function InventoryReport() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [branchId, setBranchId] = useState(1); // Default branch ID

  const [user, setUser] = useState(null);


    const storedData = localStorage.getItem('user');
    useEffect(() => {
        if(storedData){
            setUser(JSON.parse(storedData));
            setBranchId(user.branch_id);
        }else{
            setUser(null);
        }
    }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error before fetching

      try {
        const response = await fetch(`http://localhost:8080/api/report/stockLevel?branchId=${branchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        setStockData(data); // Update with fetched data
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStockData();
  }, [branchId]); // Re-fetch if branchId changes

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
              <td colSpan="3" className="text-center">No stock data available</td>
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
