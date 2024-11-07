import React, { useEffect, useState } from 'react';
import './sales.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Sales() {
    const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [billDetails, setBillDetails] = useState([]);
  const [stock, setStock] = useState([]);
  const [total, setTotal] = useState(0);
  const [settled, setSettled] = useState(0);
  const [change, setChange] = useState(0);


  // Item inputs
  const [item, setItem] = useState({
    id: '',
    name: '',
    price: 0,
    quantity: "",
    sold_item_unit_price:"",
    medicine_id:""
  });

//   const [billRecord, setBillRecord] = useState({
//     quantity: "",
//     sold_item_unit_price:"",
//     bill_no:"",
//     medicine_id:""
//   });


  // Handler for adding items to the cart
  const handleAddToCart = () => {
    if(stock.length != 0){
        if(item.quantity > stock.find(x => x.medicine_id == item.id).stock_quantity){
            alert("Not enough stock");
            return;
        }else{
            const newCart = [...cart, item];
            setCart(newCart);
        }
    }


    
    setTotal(total + item.price * item.quantity);
    setItem({ id: '', name: '', price: 0, quantity: "", sold_item_unit_price:"", medicine_id:"" });
  };




  // Handler for clearing item inputs
  const handleClearItem = () => {
    setItem({ id: '', name: '', price: 0, quantity: "", sold_item_unit_price:"", medicine_id:"" });
  };

// funtion for pay button
  const handlePay = async () => {
    if (settled < total) {
      alert("The settled amount is less than the total. Please enter a valid amount.");
      return;
    }
  
    
  
    try {
      // Send a POST request to the API to finalize the transaction
      const response = await axios.post(`http://localhost:8080/api/salesManagement/pay/${user.branch_id}`);
      
      if (response.status === 200) {
        alert("Payment successful!");
        // Clear the cart and reset values
        setCart([]);
        setTotal(0);
        setSettled(0);
        setChange(0);
        getStockList(); // Refresh stock list

        try{
            const response = await axios.post(`http://localhost:8080/api/salesManagement/insertAllSaleDetails`, cart)
        }catch(err){
            alert("Could not save sales detils");
        }

      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred during the payment process.");
    }
  };


  //Get stock List
    const getStockList = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/salesManagement/sales_stock_view/${user.branch_id}`);
            console.log(result.data);
            setStock(result.data);

        } catch (err) {
            console.error(err.message);
        }
    }

    const [user, setUser] = useState({});   //Use state to store user data
    const storedData = localStorage.getItem('user');    //Get user data from local storage


    useEffect(() => {

        if(storedData){   //Check if user is logged in
            setUser(JSON.parse(storedData));      //Set user data
            
            // if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
            //     localStorage.removeItem('user');        //Remove user data and re direct to login page
            // }
            console.log(JSON.parse(storedData));
            
        }else{                          //If user is not logged in
        navigate('/login');       //Redirect to login page
        }

    }, []);

    useEffect(() => {
        if (user && user.branch_id) {
            getStockList(user.branch_id);
        }
    }, [user]);

  return (
    <div className="sales-container">
      {/* Left Column for Inventory Table and Item Input Form */}
      <div className="left-column">
        <h4>Stocks</h4>
        <div className="inventory-table-container">
            <table className="inventory-table">
            <thead>
                <tr>
                <th>Medicine ID</th>
                <th>Name</th>
                <th>Dose</th>
                <th>Stock</th>
                {/* <th>Unit Price</th> */}
                </tr>
            </thead>
            <tbody>

                {stock.map((item, index) => (
                    <tr key={index} onClick={() => {
                        setItem({
                            id: item.medicine_id,
                            name: item.medicine_name,
                            price: item.unit_price,
                            quantity: "",
                            sold_item_unit_price:item.unit_price,
                            medicine_id:item.medicine_id
                        });
                    }}>
                    <td>{item.medicine_id}</td>
                    <td>{item.medicine_name}</td>
                    <td>{item.unit_type+"-" +item.dose}</td>
                    <td>{item.stock_quantity}</td>
                    {/* <td>{item.unit_price}</td> */}
                </tr>
                ))}
                

            </tbody>
            </table>
        </div>

        {/* New Item Input Form below the Inventory Table */}
        <div className="item-input-form">
            <div className="form-group">
                <label>ID:</label>
                <input
                type="number"
                disabled
                placeholder="ID"
                value={item.id}
                onChange={(e) => setItem({ ...item, id: e.target.value, medicine_id: e.target.value  })}
                />
            </div>
            
            <div className="form-group">
                <label>Name:</label>
                <input
                type="text"
                placeholder="Name"
                disabled
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <label>Price (Rs):</label>
                <input
                type="number"
                placeholder="Price (Rs)"
                disabled
                value={item.price}
                onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) || 0, sold_item_unit_price: e.target.value  })}
                />
            </div>
            
            <div className="form-group">
                <label>Quantity:</label>
                <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) || 1 })}
                />
            </div>

            <button onClick={handleAddToCart}>Add</button>
            <button onClick={handleClearItem}>Clear</button>
        </div>

      </div>

      {/* Right Column for Cart Table and Transaction Summary */}
      <div className="right-column">
        <h4>Cart</h4>
        <div className="cart-table-container">

            <table className="cart-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item, index) => (
                    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Transaction Summary */}
        <div className="transaction-summary">
          <p>Total: <span>{total.toFixed(2)}</span></p>
          <p>Settled: <input type="number" value={settled} onChange={(e) => setSettled(parseFloat(e.target.value) || 0)} /></p>
          <p>Change: <span>{(settled - total).toFixed(2)}</span></p>
          <button>Remove</button>
          <button onClick={handlePay}>Pay</button>
        </div>
      </div>
    </div>
  );
}
