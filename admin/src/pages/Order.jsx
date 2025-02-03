import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendURL}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  } 

  const handleStatusChange = async (orderId, newStatus) => {
    console.log("Sending Order ID:", orderId, "New Status:", newStatus);
    try {
      const response = await axios.post(
        `${backendURL}/api/order/updateStatus`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response:", response.data);
  
      if (response.data.success) {
        toast.success("Order status updated successfully!");
        fetchOrders(); // Refresh orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    if(token)
    {

      fetchOrders();
    }
  }, [token]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Order Summary</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h4 style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
            Order ID: {order._id}
          </h4>
          <p><strong>Customer Name:</strong> {order.address.firstname} {order.address.lastname}</p>
          <p><strong>Customer Email:</strong> {order.address.email}</p>
          <p><strong>Customer Phone:</strong> {order.address.phone}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> <span style={{ color: order.paymentStatus ? "green" : "red" }}>{order.paymentStatus ? "Completed" : "Pending"}</span></p>

          <h4 style={{ marginTop: "15px" }}>Products:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {order.products.flat().map((product, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                  maxWidth: "400px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p>Qty: {product.quantity}</p>
                  <p>Size: {Array.isArray(product.size) ? product.size.join(", ") : product.size}</p>
                  <p><strong>${product.price}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            style={{ marginTop: "10px" }}
            value={order.status}
            onChange={(e) =>{ handleStatusChange(order._id, e.target.value)}}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
            <p><strong>Delivery Charge:</strong> $10</p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Total Amount (incl. Delivery): ${order.totalAmount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;