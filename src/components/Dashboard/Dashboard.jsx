import React from 'react'

export default function Dashboard() {
    return (
        <>
            {/* <div className=' bg-white p-3 rounded shadow mb-4'> */}

            {/* Stats */}
            <div className="stats d-flex justify-content-between mb-4">
                <div
                    className="stat p-3 text-center"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "18px",
                            backgroundColor: "#2c2c54",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        Today's Sales
                    </h3>
                    <p>100</p>
                </div>

                <div
                    className="stat p-3 text-center"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "18px",
                            backgroundColor: "#2c2c54",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        Today's Income
                    </h3>
                    <p>1400.00</p>
                </div>

                <div
                    className="stat p-3 text-center"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "18px",
                            backgroundColor: "#2c2c54",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        Yesterday Income
                    </h3>
                    <p>12</p>
                </div>
                <div
                    className="stat p-3 text-center"
                    style={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "18px",
                            backgroundColor: "#2c2c54",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        Mounthly Income
                    </h3>
                    <p>74520.00</p>
                </div>
            </div>

            {/* Charts */}
            <div className="charts d-flex justify-content-between shadow mb-4 rounded">
                <div
                    className="chart p-3"
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3>Most Sold Medicines</h3>
                    <p>in This Mounth</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Income</th>
                                <th>Month</th>
                                <th>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    className="chart p-3"
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        flex: "1",
                        margin: "0 10px",
                    }}
                >
                    <h3>Near to Expiration</h3>
                    <p>in This Mounth</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Income</th>
                                <th>Month</th>
                                <th>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* </div> */}
        </>
    )
}
