import React from 'react'
import { NavLink } from "react-router-dom"
import order from "../assets/order_icon.png"
import parcel from "../assets/parcel_icon.svg"
import add from "../assets/add_icon.png"
import { CirclePlus, List, Package } from "lucide-react"

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-[#8c1018]'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/add">
          <CirclePlus className='w-7 text-white' />
          <p className='hidden text-white md:block'>Add Products</p>
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/list">
          <List className='w-7 text-white' />
          <p className='hidden text-white md:block'>List Products</p>
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/order">
          <Package className='w-7 text-white' />
          <p className='hidden text-white md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar