import React, { useState, useEffect } from 'react';

export default function ExpiryTracking() {
    const [expiryTracking, setExpiryTracking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [branchId, setBranchId] = useState(1); // Default branch ID
    const [user, setUser] = useState(null);

    const storedData = localStorage.getItem('user');
    useEffect(() => {
        if (storedData) {
            const parsedUser = JSON.parse(storedData);
            setUser(parsedUser);
            setBranchId(parsedUser.branch_id);
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const fetchExpiryTracking = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/report/expiryTracking?branchId=${branchId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExpiryTracking(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpiryTracking();
    }, [branchId]);

    return (
        <div>
            <h2>Expiry Tracking</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Medicine Name</th>
                        <th>Stock Quantity</th>
                        <th>Price</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(expiryTracking) && expiryTracking.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">No expiry tracking items available</td>
                        </tr>
                    ) : (
                        expiryTracking.map((item, index) => (
                            <tr key={index}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
