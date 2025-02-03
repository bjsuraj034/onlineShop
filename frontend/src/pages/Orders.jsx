import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loaderData = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Response:', response.data);

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.products.forEach((item) => {
            // Map data to each product
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = new Date(order.createdAt).toLocaleDateString();
            item['totalAmount'] = order.totalAmount;
            item['status'] = order.status; // Use order status instead of paymentStatus
            item['_id'] = order._id; // Store order ID for navigation
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loaderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orderData.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 sm:text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image || '/default-image.png'}
                alt={item.name || 'Product'}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name || 'Product Name'}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {item.price} {currency || ''}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>{item.size}</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{item.date}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === 'Delivered'
                      ? 'bg-green-500'
                      : item.status === 'Shipped'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                ></p>
                <p className="text-sm md:text-base">
                  {item.status || 'Pending'}
                </p>
              </div>
              <button
               
              >
              <Link to={`/order/${item._id}`} className="border px-4 py-2 text-sm font-medium rounded-sm">
  Track Order
</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
