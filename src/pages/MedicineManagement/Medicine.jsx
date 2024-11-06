import React, { useState, useEffect } from 'react';
import './Medicine.css';

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    medicine_id: '',
    medicine_name: '',
    supplier_details: '',
    unit_type: '', // Default to an empty string
    dose: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // Fetch medicines and suppliers from APIs
  useEffect(() => {
    fetch('http://localhost:8080/api/medicine/getallmedicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));

    fetch('http://localhost:8080/api/v1/getsuppliers')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handleUpdateClick = (medicine) => {
    setFormData({
      medicine_id: medicine.medicine_id,
      medicine_name: medicine.medicine_name,
      supplier_details: medicine.supplier_details,
      unit_type: medicine.unit_type, // Set the existing unit_type value
      dose: medicine.dose,
    });
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setIsUpdate(false);
    setFormData({
      medicine_id: '',
      medicine_name: '',
      supplier_details: '',
      unit_type: '', // Reset to empty string for new medicine
      dose: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      // Handle update logic
      console.log('Updating medicine:', formData);
    } else {
      // Handle add logic
      console.log('Adding new medicine:', formData);
    }
    handleCloseModal();
  };

  const handleSupplierChange = (event) => {
    setFormData({ ...formData, supplier_details: event.target.value });
  };

  const handleUnitTypeChange = (event) => {
    setFormData({ ...formData, unit_type: event.target.value }); // Ensure unit_type is updated
  };

  return (
    <div className="medicineContainer">
      <h3><b><center>All Medicines</center></b></h3>

      <div className="buttonContainer">
        <button className="addButton" onClick={handleAddClick}>
          Add New Medicine
        </button>
      </div>

      <table className="medicineTable">
        <thead>
          <tr>
            <th className="medicineTableHeader">Medicine ID</th>
            <th className="medicineTableHeader">Medicine Name</th>
            <th className="medicineTableHeader">Supplier Details</th>
            <th className="medicineTableHeader">Unit Type</th>
            <th className="medicineTableHeader">Dose</th>
            <th className="medicineTableHeader">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine.medicine_id} className={index % 2 === 0 ? 'evenRow' : ''}>
              <td className="medicineTableData">{medicine.medicine_id}</td>
              <td className="medicineTableData">{medicine.medicine_name}</td>
              <td className="medicineTableData">{medicine.supplier_details}</td>
              <td className="medicineTableData">{medicine.unit_type}</td>
              <td className="medicineTableData">{medicine.dose}</td>
              <td className="medicineTableData">
                <button 
                  className="updateButton" 
                  onClick={() => handleUpdateClick(medicine)}
                >
                  Update
                </button>
                <button className="deleteButton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add or Update */}
      <div className="modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
        <div className="modalContent">
          <h4 className="modalHeader">{isUpdate ? 'Update Medicine' : 'Add New Medicine'}</h4>
          <form className="modalForm" onSubmit={handleSubmit}>
            <label className="highlightedLabel">Medicine Name</label>
            <input 
              type="text" 
              className="modalInput"
              value={formData.medicine_name}
              onChange={(e) => setFormData({...formData, medicine_name: e.target.value})}
            />

            <label className="highlightedLabel">Supplier Details</label>
            <select 
              className="modalInput" 
              value={formData.supplier_details}
              onChange={handleSupplierChange}
            >
              <option value=""></option>
              {suppliers.map(supplier => (
                <option key={supplier.supplierId} value={`${supplier.supplierId} - ${supplier.supplierName}`}>
                  {supplier.supplierId} - {supplier.supplierName}
                </option>
              ))}
            </select>

            <label className="highlightedLabel">Unit Type</label>
            <select 
              className="modalInput" 
              value={formData.unit_type} 
              onChange={handleUnitTypeChange} // Corrected: ensure the onChange is set here
            >
              <option value=""></option>
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
              {/* Add more unit types as needed */}
            </select>

            <label className="highlightedLabel">Dose</label>
            <input 
              type="text" 
              className="modalInput"
              value={formData.dose}
              onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
            />

            <button type="submit" className="modalButton">{isUpdate ? 'Update' : 'Add'}</button>
            <button type="button" className="modalCloseButton" onClick={handleCloseModal}>
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
