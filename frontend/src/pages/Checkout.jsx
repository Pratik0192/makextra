import React, { useContext, useEffect, useState } from 'react'
import { ShoppingBag } from "lucide-react"
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Checkout = () => {

  const { products, cartItems, navigate, getCartAmount, calculateTaxPercentage, token, backendUrl, setCartItems } = useContext(ShopContext);
  const cartTotal = getCartAmount();
  const [ cartData, setCartData ] = useState([]);

  const [billingOption, setBillingOption] = useState("same");
  const [paymentType, setPaymentType] = useState("cod");
  const [formData, setFormData] = useState({
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: ''
  })

  const [billingFormData, setBillingFormData] = useState({
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data, [name] : value}))
  }

  const initPay = (order, userId) => {  // Accept userId
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, // Razorpay amount is in paise
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: userId, // Send userId
          };

          const { data } = await axios.post(backendUrl + "/api/order/verifyrazorpay", paymentData, { headers: { token } });

          if (data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success("Payment Successful!");
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification request failed.");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onBillingChangeHandler = (event) => {
    const { name, value } = event.target;
    setBillingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    console.log("form submitted");
    try {
      
      let orderItems = []

      for (const productId in cartItems) {
        const quantity = cartItems[productId]; // Get the quantity directly
        if (quantity > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === productId));
          if (itemInfo) {
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        userId: token,
        shippingAddress: formData,
        billingAddress: billingOption === "different" ? billingFormData : formData,
        items: orderItems,
        amount: getCartAmount(),
        paymentType: paymentType
      }

      switch (paymentType) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData,{headers: {token}})
          console.log(response.data);
          if(response.data.success) {
            setCartItems({})
            toast.success("Order Placed succesfully!", { autoClose: 2000 });
            setTimeout(() => {
              navigate('/');
            }, 2000)
          } else {
            toast.error(response.data.message)
          }
          break;
          
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers: {token}})
          if(responseRazorpay.data.success) {
            console.log(responseRazorpay.data.order);
            console.log(responseRazorpay.data); // Check if "order" exists

            initPay(responseRazorpay.data.order, orderData.userId)
          } else {
            toast.error("failed to initialize payment")
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    // console.log("Updated Cart Items:", cartItems);
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
        <h2 className='text-xl font-semibold'>Karuna Jewellery and Paridhan</h2>
        <ShoppingBag className='w-6 h-6' />
      </div>
      <hr />

      {/* Main Part */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>

        {/* Left Form */}

        <div className='px-2'>
          <h2 className='text-xl font-semibold mt-4 mb-4'>Delivery</h2>
          <form className='flex flex-col gap-6 mb-6'>
            <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country/Region' className='border-2 border-gray-300 p-3 rounded-md' />
            <div className='flex justify-between gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border-2 border-gray-300 p-3 rounded-md w-full' />
            </div>
            <input required onChange={onChangeHandler} name='address' value={formData.address} type="text" placeholder='Address' className='border-2 border-gray-300 p-3 rounded-md' />
            <input required onChange={onChangeHandler} name='apartment' value={formData.apartment} type="text" placeholder='Apartment, suite, etc. (optional)' className='border-2 border-gray-300 p-3 rounded-md' />
            <div className="flex justify-between gap-3">
              <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border-2 border-gray-300 p-3 rounded-md w-full' />
              <input required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} type="number" placeholder='PIN code' className='border-2 border-gray-300 p-3 rounded-md w-full' />
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
              <div className='flex flex-col items-center px-10 md:px-20'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className="w-40 h-40"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
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
                <input required onChange={onBillingChangeHandler} name='country' value={billingFormData.country} type="text" placeholder='Country/Region' className=' bg-white border-2 border-gray-300 p-3 rounded-md' />
                <div className='flex justify-between gap-3'> 
                  <input required onChange={onBillingChangeHandler} name='firstName' value={billingFormData.firstName} type="text" placeholder='First name' className='bg-white border-2 border-gray-300 p-3 rounded-md w-full' />
                  <input required onChange={onBillingChangeHandler} name='lastName' value={billingFormData.lastName} type="text" placeholder='Last name' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                </div>
                <input required onChange={onBillingChangeHandler} name='address' value={billingFormData.address} type="text" placeholder='Address' className='border-2 bg-white border-gray-300 p-3 rounded-md' />
                <input required onChange={onBillingChangeHandler} name='apartment' value={billingFormData.apartment} type="text" placeholder='Apartment, suite, etc. (optional)' className='border-2 bg-white border-gray-300 p-3 rounded-md' />
                <div className="flex justify-between gap-3">
                  <input required onChange={onBillingChangeHandler} name='city' value={billingFormData.city} type="text" placeholder='City' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                  <input required onChange={onBillingChangeHandler} name='state' value={billingFormData.state} type="text" placeholder='State' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                  <input required onChange={onBillingChangeHandler} name='pinCode' value={billingFormData.pinCode} type="number" placeholder='PIN code' className='border-2 bg-white border-gray-300 p-3 rounded-md w-full' />
                </div>
              </form>
            </div>
          </div>

          <button onClick={onSubmitHandler} className='w-full mt-4 bg-blue-600 text-white rounded-md text-center text-lg font-semibold py-3 hover:bg-blue-700 cursor-pointer'>
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
