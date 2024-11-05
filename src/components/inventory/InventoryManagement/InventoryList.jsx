import { useEffect, useState } from 'react';
import React from 'react';


export default function InventoryList() {
    const [inventoryData, setInventoryData] = useState([]);
    const [formData, setFormData] = useState({
        medicineId: '',
        supplierId: '',
        quantity: '',
        price: '',
        receivedDate: '',
        expiryDate: ''
    });
    const [updateMode, setUpdateMode] = useState(false); 
    const [updateId, setUpdateId] = useState(null); 
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchInventoryData();
        fetchSupplierList();
    }, []);

    const fetchInventoryData = () => {
        fetch("http://localhost:8080/api/v1/inventoryview")
            .then((response) => response.json())
            .then((data) => setInventoryData(data))
            .catch((error) => console.error("Error fetching inventory data:", error));
    };
    const fetchSupplierList = () => {
        fetch("http://localhost:8080/api/v1/getsuppliers") 
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuppliers(data);
            })
            .catch((error) => console.error("Error fetching supplier list:", error));
    };


    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission for adding or updating inventory
    const handleInventorySubmission = () => {
        const url = updateMode 
            ? `http://localhost:8080/api/v1/updateinventory/${updateId}` 
            : "http://localhost:8080/api/v1/addinventory";
        const method = updateMode ? "PUT" : "POST"; 

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                handleClearForm();
                setUpdateMode(false); 
                setUpdateId(null); 
                fetchInventoryData();
            })
            .catch((error) => console.error("Error saving inventory data:", error));
    };

    // Clear form function
    const handleClearForm = () => {
        setFormData({
            medicineId: '',
            supplierId: '',
            quantity: '',
            price: '',
            receivedDate: '',
            expiryDate: ''
        });
    };

    // Function to populate the form for updating
    const handleUpdateClick = (item) => {
        setFormData({
            medicineId: item.medicineId,
            supplierId: item.supplierId,
            quantity: item.quantity,
            price: item.price,
            receivedDate: item.receivedDate,
            expiryDate: item.expiryDate
        });
        setUpdateMode(true);
        setUpdateId(item.inventoryId); 
    };

    return (
        <>
            <div
                className="table-container bg-white p-3 rounded shadow mb-4"
                style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    maxWidth: '100%',
                }}
            >
                <table className="table" style={{ minWidth: '800px' }}>
                    <thead>
                        <tr>
                            <th scope="col">Supplier Name</th>
                            <th scope="col">Supplier Representative</th>
                            <th scope="col">Contact Number</th>
                            <th scope="col">Received Date</th>
                            <th scope="col">Expiration Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {inventoryData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.supplierName}</td>
                                <td>{item.salesRepName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.receivedDate}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                {/* Calculate total price on the fly */}
                                <td>{(item.quantity * item.price).toFixed(2)}</td>
                                <td>
                                    <button 
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleUpdateClick(item)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-3 rounded shadow mb-4">
                <form className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Medicine Id</label>
                        <input
                            type="number"
                            min={1}
                            name="medicineId"
                            value={formData.medicineId}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Supplier Id</label>
                        {/* <input
                            type="number"
                            min={1}
                            name="supplierId"
                            value={formData.supplierId}
                            onChange={handleInputChange}
                            className="form-control"
                        /> */}
                        <select
                            name="supplierId"
                            value={formData.supplierId}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Supplier</option>
    {suppliers.map((supplier) => (
        <option key={supplier.supplierId} value={supplier.supplierId}>
            {supplier.supplierName} (ID: {supplier.supplierId})
        </option>
    ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Quantity</label>
                        <input
                            type="number"
                            min={0}
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            min={0}
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Received Date</label>
                        <input
                            type="date"
                            name="receivedDate"
                            value={formData.receivedDate}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Expired Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-3 d-flex justify-content">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm mx-2 mt-4 w-50"
                            onClick={handleInventorySubmission}
                        >
                            {updateMode ? "Update" : "Add"}
                        </button>
                        <button type="button" className="btn btn-danger btn-sm mx-2 mt-4 w-50" onClick={handleClearForm}>Clear</button>
                    </div>
                </form>
            </div>
        </>
    );
}