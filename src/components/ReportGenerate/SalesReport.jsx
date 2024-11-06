import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SalesReport() {
    const [salesData, setSalesData] = useState([]);
    const [salesBy, setSalesBy] = useState('Day');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('JANUARY');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const[branchId,setBranchId]=useState(1);
    const [user, setUser] = useState(null);


    const storedData = localStorage.getItem('user');
    
    useEffect(() => {
        if(storedData){
            setUser(JSON.parse(storedData));
            setBranchId(user.branch_id);
        }else{
            setUser(null);
        }
    }, []);

    useEffect(() => {
        if (salesBy === 'Day' && selectedDate) {
            // Fetch daily sales data
            fetch(`http://localhost:8080/api/report/dailySales?selectedDate=${selectedDate}&branch_id=${branchId}`)
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
    }, [salesBy, selectedDate, selectedMonth, selectedYear]);

    const handleApplyFilters = () => {
        console.log(`Filters applied: Sales By - ${salesBy}, Date - ${selectedDate}, Month - ${selectedMonth}, Year - ${selectedYear}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    };

    return (
        <div style={{ height: "100%" }}>
            <h1 className="display-5 mb-4">Sales Report</h1>
            
            <div className="card p-4 mb-4">
                <h2 className="h4">Generate Report</h2>
                <div className="d-flex gap-3 mb-3">
                    {/* <div>
                        <label htmlFor="sales-by" className="form-label">Sales By</label>
                        <select 
                            id="sales-by" 
                            className="form-select" 
                            value={salesBy} 
                            onChange={(e) => setSalesBy(e.target.value)}
                        >
                            <option value="Day">Day</option>
                            <option value="Month">Month</option>
                        </select>
                    </div> */}
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
                                    <option value="JANUARY">January</option>
                                    <option value="FEBRUARY">February</option>
                                    <option value="MARCH">March</option>
                                    <option value="APRIL">April</option>
                                    <option value="MAY">May</option>
                                    <option value="JUNE">June</option>
                                    <option value="JULY">July</option>
                                    <option value="AUGUST">August</option>
                                    <option value="SEPTEMBER">September</option>
                                    <option value="OCTOBER">October</option>
                                    <option value="NOVEMBER">November</option>
                                    <option value="DECEMBER">December</option>
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
                                    <th>Bill No</th>
                                    <th>Medicine Name</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.length > 0 ? (
                                    salesData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[0]}</td> {/* Bill No */}
                                            <td>{item[1]}</td> {/* Medicine Name */}
                                            <td>{item[2]}</td> {/* Quantity */}
                                            <td>{typeof item[3] === 'number' ? `Rs. ${item[3].toFixed(2)}` : item[3]}</td> {/* Amount */}
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
                                    <th>Date</th>
                                    <th>Number of Sales</th>
                                    <th>Amount</th>
                                    <th>Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.length > 0 ? (
                                    salesData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(item[0])}</td> {/* Date */}
                                            <td>{item[1]}</td> {/* No of Sales */}
                                            <td>{typeof item[2] === 'number' ? `Rs. ${item[2].toFixed(2)}` : item[2]}</td> {/* Amount */}
                                            <td>{item[3]}</td> {/* Branch */}
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
            
        </div>
    );
}

export default SalesReport;
