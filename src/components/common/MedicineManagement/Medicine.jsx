import React, { useState, useEffect } from 'react';

export default function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    medicine_id: '',
    medicine_name: '',
    brand_id: '',
    unit_type: '',
    dose: '',
  });

  useEffect(() => {
    // Fetch the medicines data from the API
    fetch('http://localhost:8080/api/medicine/getallmedicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

  const handleUpdateClick = (medicine) => {
    // Set the form data with the values of the selected medicine
    setFormData({
      medicine_id: medicine.medicine_id,
      medicine_name: medicine.medicine_name,
      brand_id: medicine.brand_id,
      unit_type: medicine.unit_type,
      dose: medicine.dose,
    });
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
      textAlign: 'left',
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
    inputs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      width: '150px',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#2a2d58',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    actionButtonUpdate: {
      padding: '5px 10px',
      backgroundColor: '#4CAF50', // Green for Update
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      marginRight: '10px', // Space between buttons
    },
    actionButtonDelete: {
      padding: '5px 10px',
      backgroundColor: '#f44336', // Red for Delete
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Medicine ID</th>
            <th style={styles.th}>Medicine Name</th>
            <th style={styles.th}>Brand ID</th>
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
              <td style={styles.td}>{medicine.brand_id}</td>
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

      <div style={styles.inputs}>
        <input
          style={styles.input}
          type="number"
          placeholder="Medicine ID"
          value={formData.medicine_id}
          onChange={(e) => setFormData({ ...formData, medicine_id: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Medicine Name"
          value={formData.medicine_name}
          onChange={(e) => setFormData({ ...formData, medicine_name: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Brand ID"
          value={formData.brand_id}
          onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Unit Type"
          value={formData.unit_type}
          onChange={(e) => setFormData({ ...formData, unit_type: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Dose"
          value={formData.dose}
          onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
        />
      </div>

      <div style={styles.buttons}>
        <button style={styles.button}>Add</button>
        <button style={styles.button}>Search</button>
        <button style={styles.button}>Clear</button>
      </div>
    </div>
  );
}
