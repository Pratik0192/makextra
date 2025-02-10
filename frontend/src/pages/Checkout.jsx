import React, { useContext, useEffect, useState } from 'react'
import { ShoppingBag } from "lucide-react"
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {

  const { products, currency, cartItems, navigate, updateQuantity, getCartAmount, calculateTaxPercentage } = useContext(ShopContext);
  const cartTotal = getCartAmount();
  const [ cartData, setCartData ] = useState([]);

  const [billingOption, setBillingOption] = useState("same");
  const [paymentType, setPaymentType] = useState("cod");

  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
    const tempData = Object.entries(cartItems).map(([itemId, quantity]) => ({
      _id: itemId,
      quantity,
    }));
    setCartData(tempData)
  }, [cartItems]);

  return (
    <div className=''>

      {/* Navbar of Checkout */}
      <div className='flex justify-between py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>
        <h2 className='text-xl font-semibold'>Makextra Fashion</h2>
        <ShoppingBag className='w-6 h-6' />
      </div>
      <hr />

      {/* Main Part */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>

        {/* Left Form */}

        <div className='px-2'>
          <h2 className='text-xl font-semibold mt-4 mb-4'>Delivery</h2>
          <form className='flex flex-col gap-6 mb-6'>
            <input type="text" placeholder='Country/Region' className='border-2 border-gray-300 p-3 rounded-md' />
            <div className='flex justify-between gap-3'>
              <input type="text" placeholder='First name' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input type="text" placeholder='Last name' className='border-2 border-gray-300 p-3 rounded-md w-full' />
            </div>
            <input type="text" placeholder='Address' className='border-2 border-gray-300 p-3 rounded-md' />
            <input type="text" placeholder='Apartment, suite, etc. (optional)' className='border-2 border-gray-300 p-3 rounded-md' />
            <div className="flex justify-between gap-3">
              <input type="text" placeholder='City' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input type="text" placeholder='State' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input type="number" placeholder='PIN code' className='border-2 border-gray-300 p-3 rounded-md w-full' />
            </div>
          </form>

          <h2 className='text-lg font-semibold mt-6'>Shipping method</h2>
          <p className='bg-[#F5F5F5] text-sm text-gray-600 p-5 mt-2'>Enter your shipping address to view available shipping methods.</p>

          {/* payment selection part */}

          <h2 className='text-xl font-semibold mt-6'>Payment</h2>
          <p className='text-sm text-gray-600 mb-4'>All transactions are secure and encrypted.</p>
          <div className='w-full'>
            <label className={`border rounded-t-md py-3 px-2 w-full flex items-center gap-4 cursor-pointer ${paymentType === "razorpay" ? "bg-[#f0f5ff] border-blue-600" : "bg-white border-gray-300"} `}>
              <input 
                type="radio" 
                name='payment'
                value="razorpay"
                checked={paymentType === "razorpay"}
                onChange={() => setPaymentType("razorpay")}
              />
              <span className='text-sm'>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</span>
            </label>
            <div 
              className={`bg-[#F0F5FF] px-2 overflow-hidden transition-all duration-300 ${
                paymentType === "razorpay" ? "max-h-[500px] opacity-100 rounded-b-md " : "max-h-0 opacity-0"
              }`}
            >
              <div className='flex flex-col items-center px-20'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" class="w-40 h-40"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
                <p className='text-center pb-4 text-sm'>After clicking “Pay now”, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
              </div>
              
            </div>
            <label className={`border py-3 px-2 w-full flex items-center gap-4 cursor-pointer ${paymentType === "cod" ? "bg-[#F0F5FF] border-blue-600 rounded-none" : "bg-white border-gray-300 rounded-b-md"}`}>
              <input 
                type="radio"
                name='payment'
                value="cod"
                checked={paymentType === "cod"}
                onChange={() => setPaymentType("cod")}
              />
              <span className='text-sm'>Cash on Delivery (COD)</span>
            </label>
            <div 
              className={`bg-[#F0F5FF] px-2 overflow-hidden transition-all duration-300 ${
                paymentType === "cod" ? "max-h-[500px] opacity-100 rounded-b-md " : "max-h-0 opacity-0"
              }`}
            >
              <p className='text-center py-4 text-sm'>Free Delivery all over india</p>
            </div>
          </div>


          {/* billing address part */}

          <h2 className='text-lg font-semibold mt-6'>Billing address</h2>
          <div className='w-full'>
            <label className={`border rounded-t-md py-3 px-2 w-full flex items-center gap-4 cursor-pointer ${billingOption === "same" ? "bg-[#F0F5FF] border-blue-600" : "bg-white border-gray-300"}`}>
              <input 
                type="radio"
                name="billing" 
                value="same" 
                checked={billingOption === "same"} 
                onChange={() => setBillingOption("same")} 
              />
              <span className='text-sm'>Same as shipping address</span>
            </label>
            <label className={`border py-3 px-2 w-full flex items-center gap-4 cursor-pointer ${billingOption === "different" ? "bg-[#F0F5FF] border-blue-600 rounded-none" : "bg-white border-gray-300 rounded-b-md"}`}>
              <input 
                type="radio" 
                name="billing" 
                value="different" 
                checked={billingOption === "different"} 
                onChange={() => setBillingOption("different")} 
              />
              <span className='text-sm'>Use a different billing address</span>
            </label>
            {/* sliding billing address form */}
            <div
              className={`bg-[#F0F5FF] px-2 pt-2 overflow-hidden transition-all duration-300 ${
                billingOption === "different" ? "max-h-[500px] opacity-100 rounded-b-md " : "max-h-0 opacity-0"
              }`}
            >
              <form className='flex flex-col gap-6 mb-6'>
                <input type="text" placeholder='Country/Region' className=' bg-white border-2 border-gray-300 p-3 rounded-md' />
                <div className='flex justify-between gap-3'> 
                  <input type="text" placeholder='First name' className='bg-white border-2 border-gray-300 p-3 rounded-md w-full' />
                  <input type="text" placeholder='Last name' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                </div>
                <input type="text" placeholder='Address' className='border-2 bg-white border-gray-300 p-3 rounded-md' />
                <input type="text" placeholder='Apartment, suite, etc. (optional)' className='border-2 bg-white border-gray-300 p-3 rounded-md' />
                <div className="flex justify-between gap-3">
                  <input type="text" placeholder='City' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                  <input type="text" placeholder='State' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                  <input type="number" placeholder='PIN code' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                </div>
              </form>
            </div>
          </div>

          <button className='w-full mt-4 bg-blue-600 text-white rounded-md text-center text-lg font-semibold py-3 hover:bg-blue-700 cursor-pointer'>
            {paymentType === "razorpay" ? "Pay now" : "Complete order"}
          </button>
          <hr className='border border-gray-300 mt-20 mb-4' />
          <p className='text-sm text-blue-600 underline underline-offset-2 cursor-pointer mb-5'>Privacy policy</p>
        </div>
        

        {/* Right Grid */}
        <div className='border-l border-gray-300 bg-[#f0f0f0] pt-5'>
          <div>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div key={index} className="py-2 px-10">
                  <div className='flex gap-2 items-center'>
                    {/* Make sure the image container is relative */}
                    <div className='relative'>
                      <img className='w-10 sm:w-16' src={productData?.images[0]} alt="" />
                      {/* Ensure quantity badge is inside the relative div */}
                      {item.quantity > 0 && (
                        <span className='absolute bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs -top-1 -right-1'>
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <p className='text-sm'>{productData?.name}</p>
                    <p className='text-sm'>₹ {productData?.discounted_price}</p>
                  </div>
                </div>
              );
            })
          }

          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex justify-between px-10 text-sm'>
              <p>Subtotal · 2 items</p>
              <p>₹ {getCartAmount()}</p>
            </div>
            <div className='flex justify-between px-10 text-sm'>
              <p>Shipping</p>
              <p>FREE</p>
            </div>
            <div className='flex justify-between px-10 text-xl font-semibold'>
              <p>Total</p>
              <p>₹ {getCartAmount()}</p>
            </div>
            <p className='px-10 text-sm text-gray-500'>including ₹{calculateTaxPercentage(cartTotal)} in taxes.</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Checkout
