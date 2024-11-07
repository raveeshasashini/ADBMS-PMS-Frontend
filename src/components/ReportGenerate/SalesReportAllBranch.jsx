import React, { useState, useEffect, Children } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SalesReportAllBranch() {
    const [salesData, setSalesData] = useState([]);
    const [salesBy, setSalesBy] = useState('Day');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('1');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [activeTab,setActiveTab]=useState("Daily");
    const[reportData,setReportData]=useState([]);


    useEffect(()=>
    {
        fetch(`http://localhost:8080/api/report/getTodaySales?option=${activeTab}`)
        .then(response=>response.json())
        .then(data=>setReportData(data))
        .catch(error => console.error('Error fetching daily data:', error));
    })
    


    useEffect(() => {
        if (salesBy === 'Day' && selectedDate) {
            // Fetch daily sales data
            fetch(`http://localhost:8080/api/report/dailySalesAllBranch?selectedDate=${selectedDate}`)
                .then(response => response.json())
                .then(data => setSalesData(data))
                .catch(error => console.error('Error fetching daily data:', error));
        } else if (salesBy === 'Month') {
            // Fetch monthly sales data
            fetch(`http://localhost:8080/api/report/monthlySales?selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`)
                .then(response => response.json())
                .then(data => setSalesData(data))
                .catch(error => console.error('Error fetching monthly data:', error));
        }
        else if(salesBy === 'Year'){

            fetch(`http://localhost:8080/api/report/yearlySales?selectedYear=${selectedYear}`)
                .then(response => response.json())
                .then(data => setSalesData(data))
                .catch(error => console.error('Error fetching yearly data:', error));
        }
    }, [salesBy, selectedDate, selectedMonth, selectedYear]);

    const handleApplyFilters = () => {
        console.log(`Filters applied: Sales By - ${salesBy}, Date - ${selectedDate}, Month - ${selectedMonth}, Year - ${selectedYear}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            console.error("Invalid date:", dateString);  // Log invalid date to the console for debugging
            return "";  // Return empty string or a default value if the date is invalid
        }
        return date.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    };
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div style={{ height: "100%" }}>
            <div className="card p-4 mb-4">
            <h1 className="display-5 mb-4"> Report</h1>
            {/* Tabs */}
            <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'Daily' ? 'active' : ''}`}
                            onClick={() => handleTabChange('Daily')}
                        >
                            Today
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'Monthly' ? 'active' : ''}`}
                            onClick={() => handleTabChange('Monthly')}
                        >
                            This Month
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'Yearly' ? 'active' : ''}`}
                            onClick={() => handleTabChange('Yearly')}
                        >
                            This Year
                        </button>
                    </li>
                </ul>
                
                {/* Report Table */}
                <table className="table table-striped mt-4">
                    <thead className="table-light">
                        <tr>
                            <th>Branch</th>
                            <th>Total Sales</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.length > 0 ? (
                            reportData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item[0]}</td> {/* Branch */}
                                    <td>{typeof item[1] === 'number' ? `Rs. ${item[1].toFixed(2)}` : item[1]}</td> {/* Total Sales */}
                                    <td>{typeof item[2] === 'number' ? `Rs. ${item[2].toFixed(2)}` : item[2]}</td> {/* Profit */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        
            
            
            <div className="card p-4 mb-4">
                <h2 className="h4">Generate Sales Report</h2>
                <div className="d-flex gap-3 mb-3">
                    <div>
                        <label htmlFor="sales-by" className="form-label">Sales By</label>
                        <select 
                            id="sales-by" 
                            className="form-select" 
                            value={salesBy} 
                            onChange={(e) => setSalesBy(e.target.value)}
                        >
                            <option value="Day">Day</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                    {salesBy === 'Day' ? (
                        <div>
                            <label htmlFor="date" className="form-label">Select Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                className="form-control" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="month" className="form-label">Select Month</label>
                                <select 
                                    id="month" 
                                    className="form-select" 
                                    value={selectedMonth} 
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value='1'>January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="year" className="form-label">Select Year</label>
                                <input 
                                    type="number" 
                                    id="year" 
                                    className="form-control" 
                                    value={selectedYear} 
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>
                <button className="btn btn-primary btn-sm" style={{width:'100px'}} onClick={handleApplyFilters}>Generate</button>
            </div>

            {
                salesBy==='Day' && selectedDate && (
                   <div className="card p-4">
                        <h2 className="h4 mb-3">Sales Data</h2>
                        <table className="table table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Branch</th>
                                    <th>Total Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.length > 0 ? (
                                    salesData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[0]}</td> {/* Branch */}
                                            <td>{typeof item[1] === 'number' ? `Rs. ${item[1].toFixed(2)}` : item[1]}</td> {/* Amount */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                salesBy==='Month' && (
                    <div className="card p-4">
                        <h2 className="h4 mb-3">Sales Data</h2>
                        <table className="table table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Branch</th>
                                    <th>Total Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.length > 0 ? (
                                    salesData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[0]}</td> {/*Branch */}
                                            <td>{typeof item[1] === 'number' ? `Rs. ${item[1].toFixed(2)}` : item[1]}</td> {/* Amount */}
                                         
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }
            {salesBy==='Year' && (
                <div className="card p-4">
                    <h2 className="h4 mb-3">Sales Data</h2>
                    <table className="table table-striped">
                        <thead className="table-light">
                            <tr>
                                <th>Branch</th>
                                <th>Total Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.length > 0 ? (
                                salesData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item[0]}</td> {/* Branch */}
                                        <td>{typeof item[1] === 'number' ? `Rs. ${item[1].toFixed(2)}` : item[1]}</td> {/* Total Sales */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            
        </div>
    );
}

export default SalesReportAllBranch;
