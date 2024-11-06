import React, { useEffect, useState } from 'react';
import './Branches.css';
import axios from 'axios';

export default function Branches() {

  const [branchList, setBranchList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [managerList, setManagerList] = useState([]);
  
  const [loading, setLoading] = useState(false);

  // states for creating a branch
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    branch_name: '',
    location: '',
    contact_number: '',
  });

  const handleEditBranch = (branchId) => {   
    const branchToEdit = branchList.find(branch => branch.branch_id === branchId);
    setSelectedBranch(branchToEdit);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBranch(null);
  };

  const handleSaveChanges = async () => {     //Update functionality
    
    try{
        await axios.put ('http://localhost:8080/api/branchManagement/procedure_update_branch', { branch_id: selectedBranch.branch_id, branch_name: selectedBranch.branch_name, location: selectedBranch.location, contact_number: selectedBranch.contact_number, user_id: selectedBranch.user_id });
        alert("Changes saved!");
        getAllBranches();
    } catch (err) {
      console.log(err);
    }
    
    closeEditModal();
  };

  const handleDisableBranch = async (branchId) => {   
    try {
      await axios.post('http://localhost:8080/api/branchManagement/updateIsDisabled', { branch_id: branchId, is_disabled: 1 });
      alert("Branch disabled successfully!");
      getAllBranches();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnableBranch = async (branchId) => {   
    try {
      await axios.post('http://localhost:8080/api/branchManagement/updateIsDisabled', { branch_id: branchId, is_disabled: 0 });
      alert("Branch enabled successfully!");
      getAllBranches();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllBranches = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/branchManagement/getAllBranches');
      setBranchList(response.data);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };


  const getAllManagers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/branchManagement/getAllManagers');
      setManagerList(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // functions for Create Branch modal
  const handleCreateNewBranch = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewBranch({ branch_name: '', location: '', contact_number: '', user_id: '' });
  };


  const handleSaveNewBranch = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/branchManagement/procedure_insert_branch', newBranch);
      alert("New branch created successfully!");
      getAllBranches();
    } catch (err) {
      console.log(err);
    }
    closeCreateModal();
    setLoading(false);
  };

  useEffect(() => {
    getAllBranches();
    getAllManagers();
  }, []);

  return (
    <div className="app-container">
      <div className="content">
        <main className="main-content">
          <h3><center>All Branches</center></h3>

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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>Data loading...
                      </td>
                    </tr>
                  ) :
                  branchList.length > 0 ? (
                    branchList.map((branch) => (
                      <tr key={branch.branch_id}>
                        <td>{branch.branch_id}</td>
                        <td>{branch.branch_name}</td>
                        <td>{branch.location}</td>
                        <td>{branch.contact_number}</td>
                        <td>{branch.manager_name == null ? 'No manager Assigned' : branch.manager_name}</td>
                        <td>{branch.is_disabled == 0? ("Enabled"):("Disabled")}</td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEditBranch(branch.branch_id)}>
                            Edit
                          </button>
                          {branch.is_disabled == 0 ? (
                            <button className="disable-btn" onClick={() => handleDisableBranch(branch.branch_id)}>
                              Disable
                            </button>
                          ) : (
                            <button className="enable-btn" onClick={() => handleEnableBranch(branch.branch_id)}>
                              Enable
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>No branches available.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Branch</h3>
            <label>Branch Name:</label>
            <input 
              type="text" 
              value={selectedBranch.branch_name} 
              onChange={(e) => setSelectedBranch({...selectedBranch, branch_name: e.target.value})}
            />
            <label>Location:</label>
            <input 
              type="text" 
              value={selectedBranch.location} 
              onChange={(e) => setSelectedBranch({...selectedBranch, location: e.target.value})}
            />
            <label>Contact Number:</label>
            <input 
              type="text" 
              value={selectedBranch.contact_number} 
              onChange={(e) => setSelectedBranch({...selectedBranch, contact_number: e.target.value})}
            />
            

            {console.log(managerList)}

            <label>Manager:</label>
            <select
              value={selectedBranch.user_id} 
              onChange={(e) => setSelectedBranch({...selectedBranch, user_id: e.target.value})}
            >
              <option value="">Select Manager</option>
              {managerList.map(manager => (
                <option key={manager.user_id} value={manager.user_id}>
                  {manager.user_id + " - " + manager.name}
                </option>
              ))}
            </select>




            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}



      {/* Create New Branch Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Branch</h3>
            <label>Branch Name:</label>
            <input 
              type="text" 
              value={newBranch.branch_name} 
              onChange={(e) => setNewBranch({...newBranch, branch_name: e.target.value})}
            />
            <label>Location:</label>
            <input 
              type="text" 
              value={newBranch.location} 
              onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
            />
            <label>Contact Number:</label>
            <input 
              type="text" 
              value={newBranch.contact_number} 
              onChange={(e) => setNewBranch({...newBranch, contact_number: e.target.value})}
            />
            {/*<label>Manager:</label>
            <select
              value={newBranch.user_id} 
              onChange={(e) => setNewBranch({...newBranch, user_id: e.target.value})}
            >
              <option value="">Select Manager</option>
              {managerList.map(manager => (
                <option key={manager.user_id} value={manager.user_id}>
                  {manager.user_id + " - " + manager.name}
                </option>
              ))}
            </select> */}

            <div className="modal-buttons">
              <button onClick={handleSaveNewBranch}>Create Branch</button>
              <button onClick={closeCreateModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
