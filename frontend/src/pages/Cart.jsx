import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import bin_icon from '../assets/bin_icon.png'
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, navigate, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  
  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
    const tempData = Object.entries(cartItems).map(([itemId, quantity]) => ({
      _id: itemId,
      quantity,
    }));
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 ">
      <div className="flex justify-between">
        <h2 className='text-[#103948] text-2xl md:text-4xl font-medium mb-6'>Your Cart</h2>
        <Link to='/'>
          <p className='underline underline-offset-4 decoration-1'>Continue shopping</p>
        </Link>
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 border-b-2 border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-30' src={productData.images[0]} alt="" />
                  <div>
                    <p className="text-xs md:text-sm font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className='text-gray-500'>{currency} {productData.discounted_price}</p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <input 
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);
                      if (newQuantity > 0) {
                        setCartData((prev) =>
                          prev.map((cartItem) =>
                            cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
                          )
                        );
                        updateQuantity(item._id, newQuantity);
                      }
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  />
                  <img 
                    onClick={() => {
                      setCartData((prev) => prev.filter((cartItem) => cartItem._id !== item._id));
                      updateQuantity(item._id, 0);
                    }}
                    className='w-2.5 mr-4 sm:w-5 cursor-pointer' 
                    src={bin_icon} 
                    alt="" 
                  />
                </div>
                <div className="">
                  <p>{currency} {productData.discounted_price}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[380px]">
          <div className='flex justify-center md:justify-end mb-4'>
            <p className='text-[#103948] text-md font-medium mr-5'>Estimated total</p>
            <p className='text-lg font-medium text-gray-600'>{currency} {getCartAmount()}.00</p>
          </div>
          <p className='flex justify-center md:justify-end text-xs text-gray-500 font-medium'>Taxes included. Discounts and shipping calculated at </p>
          <p className='flex justify-center md:justify-end text-xs text-gray-500 font-medium'>checkout.</p>
          <button 
            onClick={()=>navigate('/checkout')} 
            className='bg-gradient-to-r bg-[#560e13] to-[#8c1018] text-[white] text-sm font-medium my-8 px-8 py-3 w-full rounded-md shadow-md cursor-pointer'
          >
            Check out
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
