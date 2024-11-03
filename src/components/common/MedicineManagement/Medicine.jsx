import React from 'react';

export default function Medicine() {
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
    buttonHover: {
      backgroundColor: '#404383',
    },
    footer: {
      display: 'flex',
      gap: '10px',
    },
    tabButton: {
      padding: '10px 20px',
      backgroundColor: '#2a2d58',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Contact No</th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows go here */}
          <tr style={styles.evenRow}>
            {/* Example row for illustration */}
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
            <td style={styles.td}></td>
          </tr>
        </tbody>
      </table>
      
      <div style={styles.inputs}>
        <input style={styles.input} type="text" placeholder="Read ID" />
        <input style={styles.input} type="text" placeholder="Medicine Name" />
        <input style={styles.input} type="text" placeholder="Manufacture" />
        <input style={styles.input} type="number" placeholder="Price" />
        <input style={styles.input} type="text" placeholder="Stock" />
        <input style={styles.input} type="date" placeholder="Expire Date" />
      </div>

      <div style={styles.buttons}>
        <button style={styles.button}>Add</button>
        <button style={styles.button}>Update</button>
        <button style={styles.button}>Delete</button>
        <button style={styles.button}>Search</button>
        <button style={styles.button}>Clear</button>
      </div>
    </div>
  );
}
