import React, { useState, useEffect } from 'react';

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    medicine_id: '',
    medicine_name: '',
    supplier_details: '',
    unit_type: '',
    dose: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/medicine/getallmedicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
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
      width: '500px', // Increased width
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
    },
    modalCloseButton: {
      padding: '10px 15px',
      backgroundColor: '#999',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
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
            <input 
              type="text" 
              placeholder="Medicine Name" 
              style={styles.modalInput}
              value={formData.medicine_name}
              onChange={(e) => setFormData({...formData, medicine_name: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Supplier Details" 
              style={styles.modalInput}
              value={formData.supplier_details}
              onChange={(e) => setFormData({...formData, supplier_details: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Unit Type" 
              style={styles.modalInput}
              value={formData.unit_type}
              onChange={(e) => setFormData({...formData, unit_type: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Dose" 
              step="0.01" 
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
