import axios from "axios"
import React from 'react'
import { useState } from 'react'
import { backendUrl, currency } from "../App"
import { useEffect } from "react"
import { toast } from "react-toastify"

const AllProducts = () => {

  const [list, setList] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async(id) => {
    try {
      const response = await axios.post(backendUrl+'/api/product/remove', {id});
      if(response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <p className='mb-2 text-lg font-semibold'>ALL Product List</p>

      <div className="w-full overflow-x-auto">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-6 items-center py-2 px-3 border border-gray-300 bg-gray-100 text-sm font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Original Price</p>
          <p>Discounted Price</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-3 md:grid-cols-6 items-center gap-3 py-2 px-3 text-sm border-b border-gray-200">
            <img className='w-12 h-12 object-cover rounded-md' src={item.images[0]} alt={item.name} />
            <p className="truncate">{item.name}</p>
            <p className="truncate">{item.category}</p>
            <p>{currency}{item.original_price}</p>
            <p>{currency}{item.discounted_price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700 font-bold'>X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default AllProducts