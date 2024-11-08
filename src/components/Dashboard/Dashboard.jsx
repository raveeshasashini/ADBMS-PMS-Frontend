import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [todaySales, setTodaySales] = useState(0);
    const [todayIncome, setTodayIncome] = useState(0);
    const [yesterdayIncome, setYesterdayIncome] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [goodsNearExpiration, setGoodsNearExpiration] = useState([]);
    const [mostSoldMedicine,setMostSoldMedicine] = useState([]);

    // console.log(goodsNearExpiration);

    // console.log(todaySales);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    
    const fetchDashboardData = async () => {
        try {
            const todaySalesResponse = await axios.get('http://localhost:8080/api/dashboard/today-sales');
            setTodaySales(todaySalesResponse.data);
            // console.log(" test "+todaySalesResponse.data);

            const todayIncomeResponse = await axios.get('http://localhost:8080/api/dashboard/today-income');
            setTodayIncome(todayIncomeResponse.data);

            const yesterdayIncomeResponse = await axios.get('http://localhost:8080/api/dashboard/yesterday-income-sales');
            setYesterdayIncome(yesterdayIncomeResponse.data.total_sales);

            const monthlyIncomeResponse = await axios.get('http://localhost:8080/api/dashboard/monthly-income-sales');
            setMonthlyIncome(monthlyIncomeResponse.data.reduce((sum, item) => sum + item.total_sales, 0));

            const goodsNearExpirationResponse = await axios.get('http://localhost:8080/api/dashboard/goods-near-expiration');
            setGoodsNearExpiration(goodsNearExpirationResponse.data);
            console.log(goodsNearExpirationResponse.data);

            const mostSoldItems = await axios.get('http://localhost:8080/api/dashboard/most-sold-medicines');
            setMostSoldMedicine(mostSoldItems.data);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        }
    };
    return (

        <>
            <div className="stats d-flex justify-content-between mb-4">
                <div className="stat p-3 text-center"
                style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    flex: "1",
                    margin: "0 10px",
                }}>
                    <h3 style={{
                        fontSize: "18px",
                        backgroundColor: "#2c2c54",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                    }}>
                        Today's Sales
                    </h3>
                    <p>{todaySales}</p>
                </div>

                <div className="stat p-3 text-center"
                style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    flex: "1",
                    margin: "0 10px",
                }}>
                    <h3
                    style={{
                        fontSize: "18px",
                        backgroundColor: "#2c2c54",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                    }}>Today's Income</h3>
                    {/* <p>{todayIncome.toFixed(2)}</p> */}
                    <p>{Number(todayIncome).toFixed(2)}</p>
                </div>

                <div className="stat p-3 text-center"
                style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    flex: "1",
                    margin: "0 10px",
                }}>
                    <h3
                    style={{
                        fontSize: "18px",
                        backgroundColor: "#2c2c54",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                    }}>Yesterday Income</h3>
                    {/* <p>{yesterdayIncome.toFixed(2)}</p> */}
                    <p>{Number(yesterdayIncome).toFixed(2)}</p>
                </div>

                <div className="stat p-3 text-center"
                style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    flex: "1",
                    margin: "0 10px",
                }}>
                    <h3
                    style={{
                        fontSize: "18px",
                        backgroundColor: "#2c2c54",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                    }}>Monthly Income</h3>
                    {/* <p>{monthlyIncome.toFixed(2)}</p> */}
                    <p>{Number(monthlyIncome).toFixed(2)}</p>
                </div>
            </div>

            <div className="charts d-flex justify-content-between shadow mb-4 rounded">
                <div className="chart p-3"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                }}>
                    <h3>Most Sold Medicines</h3>
                    <p>in This Month</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Medicine Name</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {mostSoldMedicine.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.medicine_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="chart p-3"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                }}>
                    <h3>Near to Expiration</h3>
                    <p>in This Month</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Expiry Date</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goodsNearExpiration.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.medicine_id}</td>
                                    <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

        // <>
        //     {/* <div className=' bg-white p-3 rounded shadow mb-4'> */}

        //     {/* Stats */}
        //     <div className="stats d-flex justify-content-between mb-4">
        //         <div
        //             className="stat p-3 text-center"
        //             style={{
        //                 backgroundColor: "#e0e0e0",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3
        //                 style={{
        //                     fontSize: "18px",
        //                     backgroundColor: "#2c2c54",
        //                     color: "white",
        //                     padding: "5px",
        //                     borderRadius: "5px",
        //                     marginBottom: "10px",
        //                 }}
        //             >
        //                 Today's Sales
        //             </h3>
        //             <p>100</p>
        //         </div>

        //         <div
        //             className="stat p-3 text-center"
        //             style={{
        //                 backgroundColor: "#e0e0e0",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3
        //                 style={{
        //                     fontSize: "18px",
        //                     backgroundColor: "#2c2c54",
        //                     color: "white",
        //                     padding: "5px",
        //                     borderRadius: "5px",
        //                     marginBottom: "10px",
        //                 }}
        //             >
        //                 Today's Income
        //             </h3>
        //             <p>1400.00</p>
        //         </div>

        //         <div
        //             className="stat p-3 text-center"
        //             style={{
        //                 backgroundColor: "#e0e0e0",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3
        //                 style={{
        //                     fontSize: "18px",
        //                     backgroundColor: "#2c2c54",
        //                     color: "white",
        //                     padding: "5px",
        //                     borderRadius: "5px",
        //                     marginBottom: "10px",
        //                 }}
        //             >
        //                 Yesterday Income
        //             </h3>
        //             <p>12</p>
        //         </div>
        //         <div
        //             className="stat p-3 text-center"
        //             style={{
        //                 backgroundColor: "#e0e0e0",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3
        //                 style={{
        //                     fontSize: "18px",
        //                     backgroundColor: "#2c2c54",
        //                     color: "white",
        //                     padding: "5px",
        //                     borderRadius: "5px",
        //                     marginBottom: "10px",
        //                 }}
        //             >
        //                 Mounthly Income
        //             </h3>
        //             <p>74520.00</p>
        //         </div>
        //     </div>

        //     {/* Charts */}
        //     <div className="charts d-flex justify-content-between shadow mb-4 rounded">
        //         <div
        //             className="chart p-3"
        //             style={{
        //                 backgroundColor: "#ffffff",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3>Most Sold Medicines</h3>
        //             <p>in This Mounth</p>
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>Month</th>
        //                         <th>Income</th>
        //                         <th>Month</th>
        //                         <th>Income</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </div>
        //         <div
        //             className="chart p-3"
        //             style={{
        //                 backgroundColor: "#ffffff",
        //                 borderRadius: "10px",
        //                 flex: "1",
        //                 margin: "0 10px",
        //             }}
        //         >
        //             <h3>Near to Expiration</h3>
        //             <p>in This Mounth</p>
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>Month</th>
        //                         <th>Income</th>
        //                         <th>Month</th>
        //                         <th>Income</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                     <tr>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                         <td>-</td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>

        //     {/* </div> */}
        // </>
    )
}
