import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function UserHardDelete() {
    const [users, setUsers] = useState([]);


    useEffect(()=>{
        fetchUsers();
    })

    // Fetch all disabled users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/disable-users'); // Assumes GET /api/users/disable-users fetches all disabled users
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const hardDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/hard-delete/${userId}`);
            fetchUsers();
            
        } catch (error) {
            console.log(error);
        }
        
    };
  return (
    <>
        <div className=' table-container bg-white p-3 rounded shadow mb-4'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Delete permanently</th>
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
                                <button onClick={() => hardDeleteUser(user.user_id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
