import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import Title from "../components/Title"

const Orders = () => {

  const { currency, backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("no token");
        return;
      }
  
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
  
      if (response.data.success) {
        let allOrdersItem = [];
  
        response.data.orders.forEach((order) => {
          if (Array.isArray(order.items)) { // Ensure items exist before mapping
            order.items.forEach((item) => {
              allOrdersItem.push({
                ...item,
                status: order.status,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.createdAt, // Use timestamps
              });
            });
          } else {
            console.warn("Order has no items:", order);
          }
        });
  
        console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      } else {
        console.log("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to load orders:", error.message);
    }
  };
  
  useEffect(() => {
    if (token) { // Wait until token is available
      loadOrderData();
    }
  }, [token]);

  console.log(orderData);
  
  return (
    <div className='pt-16 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>
      <Title text={'My Orders'} />
      <div>
        {
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b border-gray-400 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                <div className="">
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency}{item.discounted_price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders