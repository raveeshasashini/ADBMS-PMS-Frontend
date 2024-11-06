import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SupplierList() {
    const [formData, setFormData] = useState({
        supplierName: "",
        salesRepresentative: "",
        address: "",
        contactNumber: "",
        email: ""
    });
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isEditing, setIsEditing] = useState(false);
    const [editingSupplierId, setEditingSupplierId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch suppliers 
    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/getsuppliers");
            console.log("Suppliers fetched:", response.data);
            setSuppliers(response.data);
            setFilteredSuppliers(response.data); 
        } catch (error) {
            setError("Error fetching suppliers");
        } finally {
            setLoading(false);
        }
    };

    // Search handler
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = suppliers.filter((supplier) =>
            supplier.supplierName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuppliers(filtered);
    };

    const handleClearForm = () => {
        setFormData({
            supplierName: "",
            salesRepresentative: "",
            address: "",
            contactNumber: "",
            email: ""
        });
        setIsEditing(false);
        setEditingSupplierId(null);
        setSearchTerm(""); 
        setFilteredSuppliers(suppliers); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddOrUpdateSupplier = async () => {
        try {
            if (isEditing && editingSupplierId !== null) {
                // Update existing supplier
                await axios.put(`http://localhost:8080/api/v1/updatesupplier/${editingSupplierId}`, {
                    supplierName: formData.supplierName,
                    saleRepName: formData.salesRepresentative,
                    address: formData.address,
                    phoneNumber: formData.contactNumber,
                    email: formData.email
                });
                console.log("Supplier updated");
            } else {
                // Add new supplier
                await axios.post("http://localhost:8080/api/v1/addsupplier", {
                    supplierName: formData.supplierName,
                    saleRepName: formData.salesRepresentative,
                    address: formData.address,
                    phoneNumber: formData.contactNumber,
                    email: formData.email
                });
                console.log("Supplier added");
            }
            handleClearForm();
            fetchSuppliers();
        } catch (error) {
            console.error("Error saving supplier data:", error);
        }
    };

    const handleEdit = async (supplier) => {
        if (!supplier.supplierId) {
            console.error("No supplier ID provided!");
            return;
        }
        console.log("Editing supplier with ID:", supplier.supplierId);
    
        setLoading(true); 
        try {
            
            const response = await axios.get(`http://localhost:8080/api/v1/getSupplierById/${supplier.supplierId}`);
            
            
            setFormData({
                supplierName: response.data.supplierName,
                salesRepresentative: response.data.saleRepName,
                address: response.data.address,
                contactNumber: response.data.phoneNumber,
                email: response.data.email
            });
            
            setIsEditing(true); 
            setEditingSupplierId(supplier.supplierId); 
        } catch (error) {
            console.error("Error fetching supplier data:", error);
            setError("Error fetching supplier data");
        } finally {
            setLoading(false); 
        }
    };
    

    return (
        <>
            <div className='mb-3'>
                <input
                    type="text"
                    placeholder="Search Supplier Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{maxWidth:'300px',border: "2px solid black", borderRadius: '0.25rem'}}
                />
            </div>
            <div className='table-container bg-white p-3 rounded shadow-sm mb-4'
                style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    maxWidth: '100%',
                }}>
                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                    <table className='table' style={{ minWidth: '800px' }}>
                        <thead>
                            <tr>
                                <th scope='col'>Supplier Name</th>
                                <th scope='col'>Sales Representative</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Contact Number</th>
                                <th scope='col'>Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.length > 0 ? (
                                filteredSuppliers.map((supplier) => (
                                    <tr key={supplier.supplierId}>
                                        <td>{supplier.supplierName}</td>
                                        <td>{supplier.saleRepName}</td>
                                        <td>{supplier.address}</td>
                                        <td>{supplier.phoneNumber}</td>
                                        <td>{supplier.email}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                
                                                onClick={() => {
                                                    console.log("Supplier in edit:", supplier);  // Log the supplier object
                                                    handleEdit(supplier);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                           
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No suppliers found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    )}
            </div>

            <div className="bg-white p-3 rounded shadow mb-4">
                <form className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Supplier Name</label>
                        <input
                            type="text"
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Sales Representative</label>
                        <input
                            type="text"
                            name="salesRepresentative"
                            value={formData.salesRepresentative}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 d-flex justify-content">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm mx-2 mt-4 w-50"
                            onClick={handleAddOrUpdateSupplier}
                        >
                            {isEditing ? "Update" : "Add"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm mx-2 mt-4 w-50"
                            onClick={handleClearForm}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}