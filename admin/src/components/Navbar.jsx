import React from 'react';
import main_logo from "../assets/new_logo.png";
import { Menu } from "lucide-react";

const Navbar = ({ setToken, setIsMobileOpen }) => {
  return (
    <div className='flex bg-[#8c1018] border-b-none items-center py-2 px-[4%] justify-between sticky top-0 z-50'>
      {/* Sidebar Toggle Button (Only on Mobile) */}
      <button onClick={() => setIsMobileOpen(true)} className="text-white md:hidden">
        <Menu className="w-6 h-6" />
      </button>

      <img className='w-[80px] max-w-[150px] ml-10 md:ml-0' src={main_logo} alt="Logo" />

      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
