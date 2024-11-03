import React, { useState } from 'react'; // Added useState import
import SalesReport from './SalesReport';

export default function ReportGenerate() {
  const [showReport, setShowReport] = useState('ReportGenerate'); // Initialize showReport state
  
  const handleGenerateReport = (report) => {
    setShowReport(report);
  };

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

  return (
    <>
      <div className="bg-white p-3 rounded shadow mb-4" style={{ overflow: 'scroll', height: "40%" }}>
        {showReport === 'Total Sales Report' ? (
          <SalesReport/> // Display SalesReport component when "Total Sales Report" is active
        ) : (
          <div>
            <Section title="Sales Reports">
              <ReportCard 
                title="Total Sales Report" 
                description="View total sales over a selected period with detailed graphs and charts." 
              />
            </Section>
    
            <Section title="Inventory Reports">
              <ReportCard title="Current Inventory Levels" description="View current stock levels." />
              <ReportCard title="Low Stock Alerts" description="Get alerts for items that are low in stock and need restocking." />
              <ReportCard title="Expiry Tracking" description="Track items nearing expiration to reduce waste." />
            </Section>
    
            <Section title="Supplier Reports">
              <ReportCard title="Order History" description="Maintain a history of orders placed with suppliers." />
              <ReportCard title="Payment Status" description="Monitor payment status for all suppliers to ensure timely payments." />
              <ReportCard title="Supplier Performance Reports" description="Evaluate supplier performance and reliability over time." />
            </Section>
          </div>
        )}
      </div>
    </>
  );
}
