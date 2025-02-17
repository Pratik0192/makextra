import React, { useEffect } from 'react';
import { motion } from "framer-motion";

const CustomToast = ({ product, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute top-5 right-6 bg-white shadow-lg rounded-lg px-3 py-4 flex items-center gap-4 w-80 md:w-120 border border-gray-200 z-50"
    >
      {/* Close Button */}
      
      <button 
        onClick={onClose} 
        className="absolute top-4 right-3 text-gray-600 hover:text-gray-900"
      >
        ✖
      </button>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-gray-600'>item added to the cart</p>
        <div className='flex flex-col gap-6'>
          <div className='flex gap-4'>
            <img src={product.image} alt="" className="w-20"/>
            <div>
              <p className="font-medium text-sm text-gray-800">{product.name}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <button className='border-2 text-gray-600 font-medium border-gray-400 rounded-sm py-2'>view cart</button>
            <button className='bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white rounded-md py-2'> checkout</button>
            <p className='text-center underline underline-offset-4'>Continue shopping</p>
          </div>
        </div>
      </div>
      
      
        
    </motion.div>
  );
};

export default CustomToast;
