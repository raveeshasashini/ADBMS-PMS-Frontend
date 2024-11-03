import React from 'react'
import { useState } from 'react';
import UserList from '../UserManagement/UserList';
import InventoryList from '../../inventory/InventoryManagement/InventoryList';


export default function Navbar_Slider() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');

    const handleNavClick = (component) => {
        setActiveComponent(component);
    }

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar p-3 text-white" style={{ backgroundColor: '#184169', height: '100vh' }}>
                <div className="profile text-center mb-4">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/CaEBT5edUnVe7kCV6JhHkQ27nfauKltvPMjGecVCFC0b5czOB.jpg"
                        alt="Profile"
                        width="80"
                        height="80"
                        className="rounded-circle"
                    />
                    <p className="mt-2">Hi, Mr Lakindu</p>
                </div>
                {['Dashboard', 'RCO Manage', 'RCO Payment', 'DCO Manage', 'Email', 'Inventory | Report', 'User Manage', 'Parches Manage'].map((item, index) => (
                    <a 
                    key={index} 
                    className="nav-link text-white my-2 p-2 rounded" 
                    style={{ backgroundColor: item === item ? '#184169' : '' }}
                    onClick={()=>handleNavClick(item)}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Main Content */}
            <div className="content flex-grow-1 p-4">
                <div className="header d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
                    <h1>Pharmacy Management System</h1>
                    <div className="date-time text-muted">09 September 2024 - 11.48 AM</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) : activeComponent === 'Inventory | Report' ? (
                    <InventoryList />// Display Inventory component when "Inventory" is active
                ): (
                    <div>
                        <h2>Welcome to the {activeComponent}</h2>
                        <p>This is the {activeComponent} section of the Pharmacy Management System.</p>
                    </div>
                )}
                
            </div>

        </div>
    )
}
