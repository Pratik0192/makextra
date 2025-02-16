import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import parcel_icon from "../assets/parcel_icon.svg"

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch All Orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async(event, orderId) => {
    try {
      
      const response = await axios.post(backendUrl+'/api/order/status', {orderId, status:event.target.value})
      if(response.data.success) {
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3>All Orders</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text:sm text-gray-700">
              <img className='w-12' src={parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if(index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity}</p>
                    } else {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity}, </p>
                    }
                  })} 
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.shippingAddress.firstName + " " + order.shippingAddress.lastName}</p>
                <div className="">
                  <p>{order.shippingAddress.address + ","}</p>
                  <p>{order.shippingAddress.city+", "+order.shippingAddress.state+", "+order.shippingAddress.country+", "+order.shippingAddress.pinCode}</p>
                </div>
                {/* <p>{order.address.phone}</p> */}
              </div>
              <div className="">
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: { order.payment ? 'Done' : 'Pending' }</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold' >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
