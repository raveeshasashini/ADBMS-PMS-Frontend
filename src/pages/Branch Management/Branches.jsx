import React, { useEffect } from 'react'
import './Branches.css';
import BranchManageService from '../../components/service/BranchManage/BranchManageService';
import axios from 'axios';

export default function Branches() {

  const [branchList, setBranchList] = React.useState([]);

  let branch = {
    branch_id: 0,
    branch_name: "",
    contact_number: "",
    is_disabled: 0,
    location: "",

  }

  const handleCreateNewBranch = () => {   // function for creating a new branch 
    // Add the logic for creating a new branch here
    alert("Create New Branch button clicked!");
  };


  const handleDisableBranch = async (branchId) => {   // function for disabling a branch
      branch.branch_id = branchId;
      branch.is_disabled = 1;

      try{
        await axios.post('http://localhost:8080/api/branchManagement/updateIsDisabled', branch);
        alert("Branch disabled successfully!");
        getAllBranches();
      }catch(err){
          console.log(err);
      }
  }

  const handleEnableBranch = async (branchId) => {   // function for enabling a branch
    branch.branch_id = branchId;
    branch.is_disabled = 0;

    try{
      await axios.post('http://localhost:8080/api/branchManagement/updateIsDisabled', branch);
      alert("Branch enabled successfully!");
      getAllBranches();
    }catch(err){
        console.log(err);
    }
  }



  const getAllBranches = async () => {
      try{
          const response = await axios.get('http://localhost:8080/api/branchManagement/getAllBranches');
          console.log(response.data);
          setBranchList(response.data);

      }catch(err){
          console.log(err);
      }
  }

  useEffect(() => {
    getAllBranches();
  }, []);




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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {
                  branchList.length> 0 ? (
                    branchList.map((branch) => (
                      <tr key={branch.branch_id}>
                        <td>{branch.branch_id}</td>
                        <td>{branch.branch_name}</td>
                        <td>{branch.location}</td>
                        <td>{branch.contact_number}</td>
                        <td>{branch.manager_name== null? ('No manager Assigned'):(branch.manager_name)}</td>
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
                  )}
                
               
              </tbody>
            </table>
          </div>
        </main>
        
      </div>
    </div>
  )
}
