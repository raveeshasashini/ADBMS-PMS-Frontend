import React, { useState, useEffect } from 'react';

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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    th: {
      backgroundColor: '#2a2d58',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #ddd',
    },
    td: {
      padding: '10px',
      textAlign: 'left',
      border: '1px solid #ddd',
    },
    evenRow: {
      backgroundColor: '#f2f2f2',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '20px',
      width: '100%',
    },
    addButton: {
      padding: '10px 15px',
      backgroundColor: '#0557d3', 
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    actionButtonUpdate: {
      padding: '5px 10px',
      backgroundColor: '#4CAF50', 
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      marginRight: '10px', 
    },
    actionButtonDelete: {
      padding: '5px 10px',
      backgroundColor: '#f44336', 
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    modal: {
      display: isModalOpen ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      width: '500px', 
      height: 'auto',
      margin: '0 10px',
    },
    modalHeader: {
      fontSize: '22px',
      marginBottom: '15px',
      textAlign: 'center',
    },
    modalForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    modalInput: {
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    modalButton: {
      padding: '12px 20px',
      backgroundColor: '#0557d3', 
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      width: '250px',
      display: 'block',  
      marginLeft: 'auto',  
      marginRight: 'auto',
    },
    modalCloseButton: {
      padding: '10px 15px',
      backgroundColor: '#999',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      width: '250px',
      display: 'block',  
      marginLeft: 'auto',  
      marginRight: 'auto',
    },
    highlightedLabel: {
      fontWeight: 'bold',
      color: '#505456  ', 
      marginBottom: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h3><b><center>All Medicines</center></b></h3>

      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={handleAddClick}>
          Add New Medicine
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Medicine ID</th>
            <th style={styles.th}>Medicine Name</th>
            <th style={styles.th}>Supplier Details</th>
            <th style={styles.th}>Unit Type</th>
            <th style={styles.th}>Dose</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine.medicine_id} style={index % 2 === 0 ? styles.evenRow : {}}>
              <td style={styles.td}>{medicine.medicine_id}</td>
              <td style={styles.td}>{medicine.medicine_name}</td>
              <td style={styles.td}>{medicine.supplier_details}</td>
              <td style={styles.td}>{medicine.unit_type}</td>
              <td style={styles.td}>{medicine.dose}</td>
              <td style={styles.td}>
                <button 
                  style={styles.actionButtonUpdate} 
                  onClick={() => handleUpdateClick(medicine)}
                >
                  Update
                </button>
                <button style={styles.actionButtonDelete}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add or Update */}
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <h4 style={styles.modalHeader}>{isUpdate ? 'Update Medicine' : 'Add New Medicine'}</h4>
          <form style={styles.modalForm} onSubmit={handleSubmit}>
            <label style={styles.highlightedLabel}>Medicine Name</label>
            <input 
              type="text" 
              style={styles.modalInput}
              value={formData.medicine_name}
              onChange={(e) => setFormData({...formData, medicine_name: e.target.value})}
            />

            <label style={styles.highlightedLabel}>Supplier</label>
            <select 
              style={styles.modalInput} 
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

            <label style={styles.highlightedLabel}>Unit Type</label>
            <input 
              type="text" 
              style={styles.modalInput}
              value={formData.unit_type}
              onChange={(e) => setFormData({...formData, unit_type: e.target.value})}
            />

            <label style={styles.highlightedLabel}>Dose</label>
            <input 
              type="number" 
              style={styles.modalInput}
              value={formData.dose}
              onChange={(e) => setFormData({...formData, dose: e.target.value})}
            />

            <button type="submit" style={styles.modalButton}>{isUpdate ? 'Update' : 'Add'}</button>
            <button type="button" style={styles.modalCloseButton} onClick={handleCloseModal}>Close</button>
          </form>
        </div>
      </div>
    </div>
  );
}
