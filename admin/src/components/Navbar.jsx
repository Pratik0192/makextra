import React from 'react'
import main_logo from "../assets/main_logo.png"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[80px] sm:w-[120px] max-w-[150px]' src={main_logo} alt="" />
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar