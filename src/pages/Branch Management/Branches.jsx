import React from 'react'
import './Branches.css';

export default function Branches() {

  const handleCreateNewBranch = () => {
    // Add the logic for creating a new branch here
    alert("Create New Branch button clicked!");
  };

  return (
    <div className="app-container">
    
      <div className="content">
        
        <main className="main-content">
          <h3><center>All Branches</center></h3>

          {/* Create New Branch Button */}
          <div className="button-container">
            <button className="create-branch-btn" onClick={handleCreateNewBranch}>
              Create New Branch
            </button>
          </div>

          <div className="table-container">
            <table className="branches-table">
              <thead>
                <tr>
                  <th>Branch ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Contact No</th>
                  <th>Manager</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example data */}
                <tr>
                  <td>B001</td>
                  <td>Central Pharmacy</td>
                  <td>Main Street, Colombo</td>
                  <td>0112345678</td>
                  <td>John Doe</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>B002</td>
                  <td>North Pharmacy</td>
                  <td>North Street, Jaffna</td>
                  <td>0212345678</td>
                  <td>Jane Smith</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditBranch('B001')}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteBranch('B001')}>
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </main>
        
      </div>
    </div>
  )
}
