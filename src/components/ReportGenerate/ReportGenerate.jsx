import React, { useState } from 'react'; // Added useState import
import SalesReport from './SalesReport';
import LowStockReport from './LowStockReport';
import InventoryReport from './InventoryReport';
import { useEffect } from 'react'; // Added useEffect import
import PurchaseHistoryReport from './PurchaseHistoryReport';
import ExpiryTracking from './ExpiryTracking';

export default function ReportGenerate() {
  const [showReport, setShowReport] = useState('ReportGenerate'); // Initialize showReport state
  const[role_id,setRoleId]=useState(0);
  const[branchId,setBranchId]=useState(0);
  const handleGenerateReport = (report) => {
    setShowReport(report);
  };


  const [user, setUser] = useState(null);
  

    const storedData = localStorage.getItem('user');

  
    
    useEffect(() => {
      const storedData = localStorage.getItem('user');
      if (storedData) {
        const parsedUser = JSON.parse(storedData);
        setUser(parsedUser);
        setRoleId(parsedUser.role_id);  // Set role_id from parsedUser
        setBranchId(parsedUser.branchId);  // Set branchId from parsedUser (if available)
      }
    }, []);

  // Define the Section component
  function Section({ title, children }) {
    return (
      <div className="">
        <h2 className="h4 fw-bold text-dark mt-5 mb-3">{title}</h2>
        <div className="row">{children}</div>
      </div>
    );
  }

  // Define the ReportCard component
  function ReportCard({ title, description }) {
    return (
      <div className="">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title fw-semibold">{title}</h5>
            <p className="card-text text-muted">{description}</p>
            {/* Corrected onClick syntax */}
            <button className="btn btn-primary" onClick={() => handleGenerateReport(title)}>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Define the goBack function
  const goBack = () => {
    setShowReport('ReportGenerate');
  };

  return (
 
    
     <div className="bg-white p-3 rounded shadow mb-4" style={{ overflow: 'scroll', height: "600px" }}>
      
      {showReport !== 'ReportGenerate' && (
       <button className="btn btn-secondary mb-3" onClick={goBack}>Back</button>
      )}

      {
        role_id==1 ? (
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={()=>{window.location.href='/add-medicine'}} >Add Medicine</button>
          </div>
        ) : 
        (
          <>
             {showReport === 'Total Sales Report' ? (
          <SalesReport/> // Display SalesReport component when "Total Sales Report" is active
        ) :
        showReport === 'Low Stock Alerts' ? (
          <LowStockReport/> // Display LowStockReport component when "Low Stock Alerts" is active
        ) :
        showReport === 'Current Inventory Levels' ? (
          <InventoryReport/>// Display LowStockReport component when "Low Stock Alerts" is active
        ) :
        showReport === 'Order History' ? (
          <PurchaseHistoryReport/>
        ) :
        showReport === 'Expiry Tracking' ? (
          <ExpiryTracking/>
        ) :
        showReport === 'ReportGenerate' &&
        (
          <div>
            <Section title="Sales Reports">
              <ReportCard 
                title="Total Sales Report" 
                description="View total sales over a selected period" 
              />
            </Section>
    
            <Section title="Inventory Reports">
              <ReportCard title="Current Inventory Levels" description="View current stock levels." />
              <ReportCard title="Low Stock Alerts" description="Get alerts for items that are low in stock and need restocking." />
              <ReportCard title="Expiry Tracking" description="Track items nearing expiration to reduce waste." />
            </Section>
    
            <Section title="Purchase Reports">
              <ReportCard title="Order History" description="Maintain a history of orders placed with suppliers." />
            </Section>
          </div>
        )}
          </>
        )
      }

       
      </div>
  );
}
