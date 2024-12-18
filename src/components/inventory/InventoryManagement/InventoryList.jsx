import { useEffect, useState } from 'react';
import React from 'react';

export default function InventoryList() {
    const [inventoryData, setInventoryData] = useState([]);
    const [formData, setFormData] = useState({
        medicineId: '',
        supplierId: '',
        branchId: '',
        quantity: '',
        price: '',
        receivedDate: '',
        expiryDate: ''
    });
    const [updateMode, setUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInventoryData();
        fetchMedicineList();
        fetchSupplierList();

        // Retrieve the branchId from localStorage (if present)
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const user = JSON.parse(storedUserData);
            setFormData((prevData) => ({
                ...prevData,
                branchId: user.branch_id
            }));
        }
    }, []);

    const fetchInventoryData = () => {
        setLoading(true);
        fetch("http://localhost:8080/api/v1/inventoryview")
            .then((response) => response.json())
            .then((data) => setInventoryData(data))
            .catch((error) => setError("Error fetching inventory data"))
            .finally(() => setLoading(false));
    };

    const fetchSupplierList = () => {
        fetch("http://localhost:8080/api/v1/getsuppliers")
            .then((response) => response.json())
            .then((data) => setSuppliers(data))
            .catch((error) => console.error("Error fetching supplier list:", error));
    };

    const fetchMedicineList = () => {
        fetch("http://localhost:8080/api/medicine/getallmedicines")
            .then((response) => response.json())
            .then((data) => setMedicines(data))
            .catch((error) => console.error("Error fetching medicine list:", error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'medicineId') {
            // Find the selected medicine
            const selectedMedicine = medicines.find(medicine => medicine.medicine_id === parseInt(value));

           
            const supplierId = selectedMedicine ? selectedMedicine.supplier_details.split(" - ")[0] : '';

            
            setFormData((prevData) => ({
                ...prevData,
                medicineId: value,
                supplierId: supplierId
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleInventorySubmission = () => {
        // Check if any field is empty
        const { medicineId, supplierId, quantity, price, receivedDate, expiryDate } = formData;
        if (!medicineId || !supplierId || !quantity || !price || !receivedDate || !expiryDate) {
            alert("All fields are required!");
            return;
        }

        console.log("Form Data being sent:", formData);
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
            .then(() => {
                handleClearForm();
                setUpdateMode(false);
                setUpdateId(null);
                fetchInventoryData();
                alert(updateMode ? "Inventory updated successfully!" : "Inventory added successfully!");
            })
            .catch((error) => {
                console.error("Error saving inventory data:", error);
                alert("There was an error while saving the inventory data.");
            });
    };
    
    const handleClearForm = () => {
        setFormData({
            medicineId: '',
            supplierId: '',
            quantity: '',
            price: '',
            receivedDate: '',
            expiryDate: '',
            branchId: formData.branchId
        });
    };

    const handleUpdateClick = (item) => {
        setUpdateMode(true);
        setUpdateId(item.inventoryId);


        fetch(`http://localhost:8080/api/v1/getInventoryById/${item.inventoryId}`)
            .then((response) => response.json())
            .then((data) => {

                setFormData({
                    medicineId: data.medicineId,
                    supplierId: data.supplierId,
                    quantity: data.quantity,
                    price: data.price,
                    receivedDate: data.receivedDate,
                    expiryDate: data.expiryDate,
                    branchId: data.branchId || formData.branchId,
                });
            })
            .catch((error) => console.error("Error fetching inventory data:", error));
    };

    return (
        <>
            <div className="table-container bg-white p-3 rounded shadow mb-4" style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'auto', maxWidth: '100%' }}>
                {loading ? (
                    <p>Loading data...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <table className="table" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Supplier Name</th>
                                <th scope="col">Supplier Representative</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Received Date</th>
                                <th scope="col">Expiration Date</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Price(LKR)</th>
                                <th scope="col">Total Price(LKR)</th>
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
                                    <td>{(item.quantity * item.price).toFixed(2)}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleUpdateClick(item)}>
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="bg-white p-3 rounded shadow mb-4">
                <form className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Medicine Id</label>
                        <select
                            name="medicineId"
                            style={{ maxHeight: "150px", overflowY: "auto" }}
                            value={formData.medicineId}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Medicine</option>
                            {medicines.map((medicine) => (
                                <option key={medicine.medicine_id} value={medicine.medicine_id}>
                                    {medicine.medicine_name} - {medicine.medicine_id}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Supplier Id</label>
                        {/* <input
                            type="text"
                            name="supplierId"
                            value={formData.supplierId}
                            onChange={handleInputChange}
                            className="form-control"
                            readOnly
                        /> */}
                        <select
                            name="supplierId"
                            value={formData.supplierId}
                            onChange={handleInputChange}
                            className="form-control"
                            
                        >
                            <option value=""></option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.supplierId} value={supplier.supplierId}>
                                    {supplier.supplierName} - {supplier.supplierId}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" min={0} name="quantity" value={formData.quantity} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Price(LKR)</label>
                        <input type="number" min={0} name="price" value={formData.price} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Received Date</label>
                        <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Expired Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="form-control" />
                    </div>

                    <div className="col-md-3 d-flex justify-content">
                        <button type="button" className="btn btn-primary btn-sm mx-2 mt-4 w-50" onClick={handleInventorySubmission}>
                            {updateMode ? "Update" : "Add"}
                        </button>
                        <button type="button" className="btn btn-danger btn-sm mx-2 mt-4 w-50" onClick={handleClearForm}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
