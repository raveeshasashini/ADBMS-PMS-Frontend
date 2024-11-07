import React, { useState } from 'react';
import './sales.css';

export default function Sales() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [settled, setSettled] = useState(0);
  const [change, setChange] = useState(0);

  // Item inputs
  const [item, setItem] = useState({
    id: '',
    name: '',
    price: 0,
    quantity: 1,
  });

  // Handler for adding items to the cart
  const handleAddToCart = () => {
    const newCart = [...cart, item];
    setCart(newCart);
    setTotal(total + item.price * item.quantity);
    setItem({ id: '', name: '', price: 0, quantity: 1 });
  };

  // Handler for clearing item inputs
  const handleClearItem = () => {
    setItem({ id: '', name: '', price: 0, quantity: 1 });
  };

  return (
    <div className="sales-container">
      {/* Left Column for Inventory Table and Item Input Form */}
      <div className="left-column">
        <h3>Inventory</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Inventory data would be mapped here */}
          </tbody>
        </table>

        {/* New Item Input Form below the Inventory Table */}
        <div className="item-input-form">
          <input 
            type="text" 
            placeholder="ID" 
            value={item.id} 
            onChange={(e) => setItem({ ...item, id: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Name" 
            value={item.name} 
            onChange={(e) => setItem({ ...item, name: e.target.value })} 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={item.price} 
            onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) || 0 })} 
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            value={item.quantity} 
            onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) || 1 })} 
          />
          <button onClick={handleAddToCart}>Add</button>
          <button onClick={handleClearItem}>Clear</button>
        </div>
      </div>

      {/* Right Column for Cart Table and Transaction Summary */}
      <div className="right-column">
        <h3>Cart</h3>
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

        {/* Transaction Summary */}
        <div className="transaction-summary">
          <p>Total: <span>{total.toFixed(2)}</span></p>
          <p>Settled: <input type="number" value={settled} onChange={(e) => setSettled(parseFloat(e.target.value) || 0)} /></p>
          <p>Change: <span>{(settled - total).toFixed(2)}</span></p>
          <button>Remove</button>
          <button>Pay</button>
        </div>
      </div>
    </div>
  );
}
