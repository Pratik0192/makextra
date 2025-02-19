import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { User, Mail, Phone, Shield, Calendar, ShoppingBag } from "lucide-react";
import moment from "moment"

const SingleUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const userResponse = await axios.get(`${backendUrl}/api/user/allusers`);
        const user = userResponse.data.users.find((u) => u._id === userId);
  
        if (user) {
          setUserData(user);
        }
  
        const ordersResponse = await axios.get(`${backendUrl}/api/user/orders/${userId}`);
        if (ordersResponse.data.success) {
          setOrders(ordersResponse.data.orders);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchAllUsers();
  }, [userId]);

  if (!userData) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }
  console.log(userData);
  console.log(orders);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 space-y-6">
      
      {/* User Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <User className="mr-2" /> User Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="flex items-center text-gray-600">
            <User className="mr-2" /> <span><strong>Name:</strong> {userData.name}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Mail className="mr-2" /> <span><strong>Email:</strong> {userData.email}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Phone className="mr-2" /> <span><strong>Mobile:</strong> {userData.mobile_number}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Shield className="mr-2" /> <span><strong>Role:</strong> {userData.role}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Calendar className="mr-2" /> <span><strong>Created At:</strong> {moment(userData.createdAt).format('DD MMM YYYY')}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <Calendar className="mr-2" /> <span><strong>Updated At:</strong> {moment(userData.updatedAt).format('DD MMM YYYY')}</span>
          </p>
        </div>
      </div>

      {/* Orders List Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <ShoppingBag className="mr-2" /> User Orders
        </h2>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center">
                <div>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Order Date:</strong> {moment(order.createdAt).format('DD MMM YYYY')}</p>
                  <p><strong>Price:</strong> ₹{order.amount}</p>
                </div>
                <button 
                  className="px-4 py-2 bg-[#8C1018] text-white rounded-lg hover:bg-[#6B0C13] transition"
                  onClick={() => alert(`Order ID: ${order._id}`)} // Placeholder for "See Details" action
                >
                  See Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
