import React, { useState, useEffect } from 'react';
import api from '../service/api';
import axios from 'axios';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        contact_no: '',
        salary: '',
        joined_date: '',
        email: '',
        password: '',
        branch_id: '',
        role_id: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch all active users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users'); // Assumes GET /api/users fetches all users
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to create or update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                // Update user
                await axios.put(`http://localhost:8080/api/users/${editingUserId}`, formData);
            } else {
                // Create new user
                await api.post('http://localhost:8080/api/users', formData);
            }
            resetForm();
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    // Handle user edit
    const handleEdit = (user) => {
        setFormData({
            name: user.name,
            contact_no: user.contact_no,
            salary: user.salary,
            joined_date: user.joined_date,
            email: user.email,
            password: user.password,
            branch_id: user.branch_id,
            role_id: user.role_id
        });
        setEditingUserId(user.user_id);
    };

    // Handle user deletion (soft delete)
    const handleDelete = async (user_id) => {
        try {
            await api.delete(`http://localhost:8080/api/users/${user_id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: '',
            contact_no: '',
            salary: '',
            joined_date: '',
            email: '',
            password: '',
            branch_id: '',
            role_id: ''
        });
        setEditingUserId(null);
    };

    return (
        // <>
        //     <div className='table-container bg-white p-3 rounded shadow mb-4'>
        //         <table className=' table'>
        //             <thead>
        //                 <tr>
        //                     <th scope='col'>#</th>
        //                     <th scope='col'>Name</th>
        //                     <th scope='col'>Email</th>
        //                     <th scope='col'>Role</th>
        //                     <th scope='col'>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 <tr>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                 </tr>
        //                 <tr>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                 </tr>
        //                 <tr>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                     <td></td>
        //                 </tr>
        //             </tbody>
                    

        //         </table>
        //     </div>
        //     <div className=' bg-white p-3 rounded shadow mb-4'>
        //         <form className=' row g-3'>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Name</label>
        //                 <input type="text" className="form-control" />
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">User Role</label>
        //                 <select className='form-select' >
        //                     <option value="" disabled >Select Role</option>
        //                     <option value="Gampaha">Admin</option>
        //                     <option value="Matara">Manager</option>
        //                     <option value="Galle">Staff</option>
        //                 </select>
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Salary</label>
        //                 <input type="number" min={0} className="form-control"  />
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Branch</label>
        //                 <select className='form-select' >
        //                     <option value="" disabled >Select Branch</option>
        //                     <option value="Gampaha">Gampaha</option>
        //                     <option value="Matara">Matara</option>
        //                     <option value="Galle">Galle</option>
        //                 </select>
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Contact No</label>
        //                 <input type="text" className="form-control"  />
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Email</label>
        //                 <input type="email" className="form-control"  />
        //             </div>

        //             <div className=' col-md-3'>
        //                 <label className="form-label">Password</label>
        //                 <input type="password" className="form-control"  />
        //             </div>

        //             <div className=' col-md-3 flex-column' >
        //                 <button  type="button"  className="btn btn-primary btn-sm mt-4" >Sign in</button>
        //                 <button  type="button"  className="btn btn-danger btn-sm mx-2 mt-4" >Clean</button>
        //             </div>
                    
        //         </form>
        //     </div>
        // </>

        <>
            <div className='table-container bg-white p-3 rounded shadow mb-4'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.user_id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role_id}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)} className="btn btn-sm btn-primary">Edit</button>
                                    <button onClick={() => handleDelete(user.user_id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='bg-white p-3 rounded shadow mb-4'>
                <form className='row g-3' onSubmit={handleSubmit}>
                    <div className='col-md-3'>
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">User Role</label>
                        <select name="roleId" value={formData.roleId} onChange={handleChange} className='form-select' required>
                            <option value="" disabled>Select Role</option>
                            <option value="1">Admin</option>
                            <option value="2">Manager</option>
                            <option value="3">Staff</option>
                        </select>
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">Salary</label>
                        <input type="number" name="salary" value={formData.salary} onChange={handleChange} min={0} className="form-control" required />
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">Branch</label>
                        <select name="branchId" value={formData.branchId} onChange={handleChange} className='form-select' required>
                            <option value="" disabled>Select Branch</option>
                            <option value="1">Gampaha</option>
                            <option value="2">Matara</option>
                            <option value="3">Galle</option>
                        </select>
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">Contact No</label>
                        <input type="text" name="contactNo" value={formData.contact_no} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className='col-md-3'>
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className='col-md-3'>
                        <button type="submit" className="btn btn-primary btn-sm mt-4">{editingUserId ? "Update" : "Add"} User</button>
                        <button type="button" onClick={resetForm} className="btn btn-danger btn-sm mx-2 mt-4">Clear</button>
                    </div>
                </form>
            </div>
        </>
    )
}
