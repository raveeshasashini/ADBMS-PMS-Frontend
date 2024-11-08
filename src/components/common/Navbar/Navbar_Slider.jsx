import React from 'react'
import { useState ,useEffect} from 'react';
import UserList from '../../UserManagement/UserList';
import Medicine from '../../../pages/MedicineManagement/Medicine';
import ReportGenerate from '../../ReportGenerate/ReportGenerate';
import InventoryList from '../../inventory/InventoryManagement/InventoryList';
import SupplierList from '../../inventory/InventoryManagement/SupplierList';
import Branches from '../../../pages/Branch Management/Branches';
import Dashboard from '../../Dashboard/Dashboard';
import Stock from '../../../pages/StockManagement/stock';
import Sales from '../../../pages/SalesManagement/Sales';
import StockReturn from '../../../pages/StockReturnManage/StockReturn';
import UserHardDelete from '../../userHardDelete/UserHardDelete';




export default function Navbar_Slider() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [user, setUser] = useState(null);
    const [userRole,setUserRole] = useState(0);

    const storedData = localStorage.getItem('user');
    useEffect(() => {
        if (storedData) {
            const parsedUser = JSON.parse(storedData);
            setUser(parsedUser);
            setUserRole(parsedUser.role_id)
            console.log(parsedUser.role_id);
            
        } else {
            setUser(null);
        }
    }, []);

    const handleNavClick = (component) => {
        setActiveComponent(component);
        
    }

    const getCurrentDateTime = () => {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return now.toLocaleString('en-US', options);
    };

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href="/";
    }

    return (
        <>{
            // admin
            userRole === 1 ?(
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
                    <p className="mt-2">Hi, {user.name}</p>
                </div>
                {['Dashboard','Branch Manage','Medicine Manage','Inventory', 'Supplier Manage', 'User Manage','Remove Users'].map((item, index) => (
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
                    <div className="date-time text-muted">{getCurrentDateTime()}</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) : 
                activeComponent === 'Branch Manage' ? (
                <>
                {/* Call Branches page */}
                    <Branches/>
                </>
                ) :
                activeComponent === 'Dashboard' ? (
                    <Dashboard/> // Display Dashboard component when "Dashboard" is active
                ) :
                activeComponent === 'Report Generate' ? (
                    <ReportGenerate/> // Display Reports Tab component when "Report Generate" is active
                ) :
                activeComponent === 'Medicine Manage' ? (
                    <Medicine/> // Display Reports Tab component when "Medicine" is active
                ) :
                activeComponent === 'Stock Manage' ? (
                    <Stock/> // Display Reports Tab component when "Stock" is active
                ):
                activeComponent === 'Stock Return Manage' ? (
                    <StockReturn/> // Display Reports Tab component when "Stock Return" is active
                ):
                activeComponent==='Inventory'?(
                    <InventoryList/>
                )
                :
                activeComponent==='Supplier Manage'?(
                    <SupplierList/>
                ):
                activeComponent==='Sales'?(
                    <Sales/>
                ):
                activeComponent==='Remove Users'?(
                    <UserHardDelete/>
                ):
                (
                    <div>
                        <h2>Welcome to the {activeComponent}</h2>
                        <p>This is the {activeComponent} section of the Pharmacy Management System.</p>
                    </div>
                )
                }
            </div>

        </div>
            ):

            // manager

            userRole === 2 ?(
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
                {['Dashboard','Sales','Stock Manage','Stock Return Manage','Inventory', 'Supplier Manage', 'Report Generate'].map((item, index) => (
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
                    <div className="date-time text-muted">{getCurrentDateTime()}</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) : 
                activeComponent === 'Branch Manage' ? (
                <>
                {/* Call Branches page */}
                    <Branches/>
                </>
                ) :
                activeComponent === 'Dashboard' ? (
                    <Dashboard/> // Display Dashboard component when "Dashboard" is active
                ) :
                activeComponent === 'Report Generate' ? (
                    <ReportGenerate/> // Display Reports Tab component when "Report Generate" is active
                ) :
                activeComponent === 'Medicine Manage' ? (
                    <Medicine/> // Display Reports Tab component when "Medicine" is active
                ) :
                activeComponent === 'Stock Manage' ? (
                    <Stock/> // Display Reports Tab component when "Medicine" is active
                ):
                activeComponent === 'Stock Return Manage' ? (
                    <StockReturn/> // Display Reports Tab component when "Stock Return" is active
                ):
                activeComponent==='Inventory'?(
                    <InventoryList/>
                )
                :
                activeComponent==='Supplier Manage'?(
                    <SupplierList/>
                ):
                activeComponent==='Sales'?(
                    <Sales/>
                ):
                activeComponent==='Remove Users'?(
                    <UserHardDelete/>
                ):
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

// cashier

            :
            userRole === 3 ?(
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
                {['Dashboard','Sales','Stock Manage','Stock Return Manage','Inventory', 'Supplier Manage'].map((item, index) => (
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
                    <div className="date-time text-muted">{getCurrentDateTime()}</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) : 
                activeComponent === 'Branch Manage' ? (
                <>
                {/* Call Branches page */}
                    <Branches/>
                </>
                ) :
                activeComponent === 'Dashboard' ? (
                    <Dashboard/> // Display Dashboard component when "Dashboard" is active
                ) :
                activeComponent === 'Report Generate' ? (
                    <ReportGenerate/> // Display Reports Tab component when "Report Generate" is active
                ) :
                activeComponent === 'Medicine Manage' ? (
                    <Medicine/> // Display Reports Tab component when "Medicine" is active
                ) :
                activeComponent === 'Stock Manage' ? (
                    <Stock/> // Display Reports Tab component when "Medicine" is active
                ) :
                activeComponent === 'Stock Return Manage' ? (
                    <StockReturn/> // Display Reports Tab component when "Stock Return" is active
                ) :
                activeComponent==='Inventory'?(
                    <InventoryList/>
                )
                :
                activeComponent==='Supplier Manage'?(
                    <SupplierList/>
                ):
                activeComponent==='Sales'?(
                    <Sales/>
                ):
                activeComponent==='Remove Users'?(
                    <UserHardDelete/>
                ):
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

            :
            userRole === 3 ?(
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
                {['Dashboard','Sales','Stock Manage','Inventory', 'Supplier Manage'].map((item, index) => (
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
                    <div className="date-time text-muted">{getCurrentDateTime()}</div>
                </div>
                {/* Conditionally render components based on the activeComponent */}
                {activeComponent === 'User Manage' ? (
                    <UserList /> // Display UserList component when "User Manage" is active
                ) : 
                activeComponent === 'Branch Manage' ? (
                <>
                {/* Call Branches page */}
                    <Branches/>
                </>
                ) :
                activeComponent === 'Dashboard' ? (
                    <Dashboard/> // Display Dashboard component when "Dashboard" is active
                ) :
                activeComponent === 'Report Generate' ? (
                    <ReportGenerate/> // Display Reports Tab component when "Report Generate" is active
                ) :
                activeComponent === 'Medicine Manage' ? (
                    <Medicine/> // Display Reports Tab component when "Medicine" is active
                ) :
                activeComponent === 'Stock Manage' ? (
                    <Stock/> // Display Reports Tab component when "Medicine" is active
                ):
                activeComponent==='Inventory'?(
                    <InventoryList/>
                )
                :
                activeComponent==='Supplier Manage'?(
                    <SupplierList/>
                ):
                activeComponent==='Sales'?(
                    <Sales/>
                ):
                activeComponent==='Remove Users'?(
                    <UserHardDelete/>
                ):
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


            
            
            :(<><div className=' h1'>404</div></>)
        }
        

        </>
    )
}
