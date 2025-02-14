import React, { useState } from 'react';

const OrderTrack = () => {
  const [searchType, setSearchType] = useState('orderId');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex justify-center items-center pt-20 pb-10 bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        
        {/* Title */}
        <div className="flex items-center space-x-3">
          <img src="https://cdn-icons-png.flaticon.com/128/3502/3502651.png" alt="tracking" className="w-10 h-10" />
          <h2 className="text-xl font-semibold text-gray-800">Track status of your shipment</h2>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Search By Options */}
        <div className="flex items-center space-x-4 text-gray-700">
          <p className="font-medium">Search By:</p>
          <label className="flex items-center space-x-1 cursor-pointer">
            <input 
              type="radio" 
              name="searchType" 
              value="orderId"
              checked={searchType === 'orderId'}
              onChange={() => setSearchType('orderId')}
              className="w-4 h-4 text-blue-600"
            />
            <span>Order ID</span>
          </label>
          <label className="flex items-center space-x-1 cursor-pointer">
            <input 
              type="radio" 
              name="searchType" 
              value="awb"
              checked={searchType === 'awb'}
              onChange={() => setSearchType('awb')}
              className="w-4 h-4 text-blue-600"
            />
            <span>AWB</span>
          </label>
        </div>

        {/* Input Field */}
        <div className="mt-4">
          <input
            type="text"
            placeholder={`Enter ${searchType === 'orderId' ? 'Order ID' : 'AWB'} to search`}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button 
          className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          disabled={!inputValue.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default OrderTrack;
