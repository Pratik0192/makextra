import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import bin_icon from '../assets/bin_icon.png'
import CartAmount from '../components/CartAmount';

const Cart = () => {
  const { products, currency, cartItems, navigate, updateQuantity } = useContext(ShopContext);
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
      <div className="">
        <Title text={'Your Cart'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 border-b-2 border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-20' src={productData.images[0]} alt="" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.discounted_price}</p>
                    </div>
                  </div>
                </div>
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
                  className='w-4 mr-4 sm:w-5 cursor-pointer' 
                  src={bin_icon} 
                  alt="" 
                />
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartAmount />
          <div className="w-full text-end">
            <button 
              onClick={()=>navigate('/')} 
              className='bg-[#DE3163] text-white text-sm my-8 px-8 py-3'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
