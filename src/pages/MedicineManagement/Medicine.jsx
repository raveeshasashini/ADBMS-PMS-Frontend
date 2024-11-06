import React, { useState, useEffect } from 'react';
import './Medicine.css';

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    medicine_id: '',
    medicine_name: '',
    supplier_details: '',
    unit_type: '',
    dose: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // Function to fetch medicines from API
  const fetchMedicines = () => {
    fetch('http://localhost:8080/api/medicine/getallmedicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  };

  // Function to fetch suppliers from API
  const fetchSuppliers = () => {
    fetch('http://localhost:8080/api/v1/getsuppliers')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching suppliers:', error));
  };

  // Fetch medicines and suppliers on component mount
  useEffect(() => {
    fetchMedicines();
    fetchSuppliers();
  }, []);

  const handleUpdateClick = (medicine) => {
    setFormData({
      medicine_id: medicine.medicine_id,
      medicine_name: medicine.medicine_name,
      supplier_details: medicine.supplier_details,
      unit_type: medicine.unit_type,
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
      unit_type: '',
      dose: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const supplierId = formData.supplier_details.split(' - ')[0];
    const medName = formData.medicine_name;
    const supId = parseInt(supplierId);
    const unitType = formData.unit_type;
    const dose = parseFloat(formData.dose);

    const medicineData = {
      medicine_name: medName,
      supplier_id: supId,
      unit_type: unitType,
      dose: dose,
    };

    fetch('http://localhost:8080/api/medicine/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicineData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Medicine added successfully!');
          handleCloseModal();
          fetchMedicines(); // Reload medicines
        } else {
          alert('Failed to add medicine.');
        }
      })
      .catch((error) => {
        console.error('Error adding medicine:', error);
        alert('Error occurred while adding the medicine.');
      });
  };

  const handleSupplierChange = (event) => {
    setFormData({ ...formData, supplier_details: event.target.value });
  };

  const handleUnitTypeChange = (event) => {
    setFormData({ ...formData, unit_type: event.target.value });
  };

  const handleDeleteClick = (medicineId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/medicine/delete?medId=${medicineId}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === 'Medicine deleted successfully.') {
          alert('Medicine deleted successfully.');
          setMedicines(medicines.filter((medicine) => medicine.medicine_id !== medicineId));
        } else {
          alert(data);
        }
      })
      .catch((error) => {
        console.error('Error deleting medicine:', error);
        alert('Error occurred while deleting the medicine.');
      });
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
            <tr key={medicine.medicine_id}>
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
                <button 
                  className="deleteButton" 
                  onClick={() => handleDeleteClick(medicine.medicine_id)}
                >
                  Delete
                </button>
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
              onChange={handleUnitTypeChange} 
            >
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
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
