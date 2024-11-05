import React from 'react'

export default function UserList() {
    return (
        <>
            <div className='table-container bg-white p-3 rounded shadow mb-4'>
                <table className=' table'>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    

                </table>
            </div>
            <div className=' bg-white p-3 rounded shadow mb-4'>
                <form className=' row g-3'>

                    <div className=' col-md-3'>
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">User Role</label>
                        <select className='form-select' >
                            <option value="" disabled >Select Role</option>
                            <option value="Gampaha">Admin</option>
                            <option value="Matara">Manager</option>
                            <option value="Galle">Staff</option>
                        </select>
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">Salary</label>
                        <input type="number" min={0} className="form-control"  />
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">Branch</label>
                        <select className='form-select' >
                            <option value="" disabled >Select Branch</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Matara">Matara</option>
                            <option value="Galle">Galle</option>
                        </select>
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">Contact No</label>
                        <input type="text" className="form-control"  />
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"  />
                    </div>

                    <div className=' col-md-3'>
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control"  />
                    </div>

                    <div className=' col-md-3 flex-column' >
                        <button  type="button"  className="btn btn-primary btn-sm mt-4" >Sign in</button>
                        <button  type="button"  className="btn btn-danger btn-sm mx-2 mt-4" >Clean</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}
