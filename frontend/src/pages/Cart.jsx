import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartAmount from '../components/CartAmount';
import { Trash, Trash2 } from 'lucide-react';

const Cart = () => {
  const { products, currency, cartItems, navigate, removefromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null)

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setCartData(cartItems);
    } else {
      console.warn("cartItems is not an array:", cartItems);
      setCartData([]); // Fallback to empty array
    }
  }, [cartItems]);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      await removefromCart(selectedProductId);
      setShowModal(false);
      window.location.reload();
    }
  };

  if (products.length === 0) return <p>Loading...</p>;

  console.log("Cart Items:", cartData);
  console.log("Products:", products);
  console.log("Matching Product Data:", cartData.map(item => {
    return {
      cartItem: item,
      matchedProduct: products.find(product => product._id === item.product_id)
    };
  }));

  return (
    <div className='pt-14 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 '>
      <div className="text-2xl">
        <Title text={'Your Cart'} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.product_id._id);
            if (!productData) {
              console.warn("No matching product found for:", item);
              return null;
            }

            return (
              <div key={index} className='py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-20' src={productData.images[0]} alt={productData.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.discounted_price}</p>
                    </div>
                  </div>
                </div>
                <input 
                  type="number" 
                  min={1}
                  value={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <button onClick={()=>handleDeleteClick(item.product_id._id)}>
                  <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer"/>
                </button>
              </div>
            );
          })
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center transition-all">
          <div className="bg-gray-300 p-6 sm:p-8 rounded-2xl shadow-2xl w-80 sm:w-96 transform scale-95 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
              Remove Item?
            </h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to remove this item from your cart? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-5 py-2 text-sm sm:text-base rounded-lg border border-gray-300 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-5 py-2 text-sm sm:text-base rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartAmount /> 
          <div className="w-full text-end">
            <button onClick={() => navigate('/')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
