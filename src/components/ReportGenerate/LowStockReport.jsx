// src/components/ReportGenerate/LowStockReport.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LowStockReport = () => {
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [branchId, setBranchId] = useState(1); // Default branch ID

    useEffect(() => {
        const fetchLowStockItems = async () => {
            setLoading(true); // Set loading to true when fetching data
            setError(null); // Reset error state before fetching

            try {
                const response = await fetch(`http://localhost:8080/api/report/lowstock?branchId=${branchId}`); // Correct API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLowStockItems(data); // Set fetched data
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchLowStockItems();
    }, [branchId]); // Fetch when branchId changes

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error if occurs
    }

  

    return (
        <div>
            <h2>Low Stock Items</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Medicine Name</th>
                        <th>Stock Quantity</th>
                        <th>Unit Price</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(lowStockItems) && lowStockItems.length === 0 ? (
                    <tr>
                        <td colSpan={Object.keys(lowStockItems[0]).length} className="text-center">No low stock items available</td>
                    </tr>
                ) : (
                    lowStockItems.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i}>{value}</td> // Dynamic values
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LowStockReport;


