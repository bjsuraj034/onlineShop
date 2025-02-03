import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const OrderDetails = () => {
  const { backendURL, token } = useContext(ShopContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) {
        console.error("User is not authenticated. Token is missing.");
        return; // Prevent making the request
      }
  
      try {
        const response = await axios.get(`${backendURL}/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log(response.data);
  
        if (response.data.success) {
          setOrder(response.data.order);
        }
      } catch (error) {
        console.error("Error fetching order details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetails();
  }, [id, backendURL, token]);
  

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <p><strong>Total Amount:</strong> {order.totalAmount} Rs</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

      <h3 className="mt-4 font-semibold">Products:</h3>
      {order.products.map((item, index) => (
        <div key={index} className="border p-4 my-2 rounded-lg">
            <img src={item.image} style={{width:'200px', borderRadius:'20px'}} alt="" />
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Price:</strong> {item.price} Rs</p>
        </div>
      ))}

      <h3 className="mt-4 font-semibold">Tracking Updates:</h3>
      {order.tracking ? (
        <ul className="list-disc pl-5">
          {order.tracking.map((update, index) => (
            <li key={index} className="mt-1">{update.status} - {new Date(update.date).toLocaleString()}</li>
          ))}
        </ul>
      ) : (
        <p>No tracking updates available.</p>
      )}
    </div>
  );
};

export default OrderDetails;
