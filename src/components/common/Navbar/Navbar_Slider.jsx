import React from 'react'
import { useState } from 'react';
import UserList from '../../UserManagement/UserList';
import Dashboard from '../../Dashboard/Dashboard';
import ReportGenerate from '../../ReportGenerate/ReportGenerate';



export default function Navbar_Slider() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');

    const handleNavClick = (component) => {
        setActiveComponent(component);
    }

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href="/";
    }

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar p-3 text-white" style={{ backgroundColor: '#184169', height: '100vh',width:'250px'}}>
                <div className="profile text-center mb-4">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/CaEBT5edUnVe7kCV6JhHkQ27nfauKltvPMjGecVCFC0b5czOB.jpg"
                        alt="Profile"
                        width="80"
                        height="80"
                        className="rounded-circle"
                    />
                    <p className="mt-2">Hi, Lakindu</p>
                </div>
                {['Dashboard', 'RCO Manage', 'RCO Payment', 'DCO Manage', 'Email', 'Inventory', 'User Manage', 'Purches Manage','Report Generate'].map((item, index) => (
                    <a 
                    key={index} 
                    className="nav-link text-white my-2 p-2 rounded border-danger" 
                    style={{ backgroundColor: item === item ? '#184169' : '' ,cursor:'pointer'}}
                    onClick={()=>handleNavClick(item)}
                    
                    >
                        {item}
                    </a>
                ))}
                <div style={{
                    position: 'relative',
                    height: '200px'
                }}>
                    <a className='nav-link text-white my-2 p-2 rounded border-danger'
                    style={{ 
                        backgroundColor:'#184169',
                        cursor:'pointer',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0
                    
                    }}
                    onClick={logout}
                    >
                        Logout
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="content flex-grow-1 p-4">
                <div className="header d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4 shadow">
                    <h1>Pharmacy Management System</h1>
                    <div className="date-time text-muted">09 September 2024 - 11.48 AM</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) :
                activeComponent === 'Dashboard' ? (
                    <Dashboard/> // Display Dashboard component when "Dashboard" is active
                ) :
                activeComponent === 'Report Generate' ? (
                    <ReportGenerate/> // Display Reports Tab component when "Report Generate" is active
                )
                :

                (
                    <div>
                        <h2>Welcome to the {activeComponent}</h2>
                        <p>This is the {activeComponent} section of the Pharmacy Management System.</p>
                    </div>
                )
                }
            </div>

        </div>
    )
}
