import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { CirclePlus, List, Menu, Package, ChevronDown, ChevronUp, User, ListOrdered, BookUser, Home } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control sidebar collapse
  const [isProductsOpen, setIsProductsOpen] = useState(false); // State to toggle Products section
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // State to toggle Orders section
  const [isUsersOpen, setIsUsersOpen] = useState(false); // State to toggle Users section

  return (
    <div className={`min-h-screen transition-all duration-300 ${isCollapsed ? 'w-[5%]' : 'w-[18%]'} bg-[#8c1018]`}>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <button
          className="text-white px-2 py-1"
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle the sidebar collapse
        >
          {isCollapsed ? <Menu className="w-6" /> : <Menu className="w-6" />} {/* Toggle icon */}
        </button>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          to='/'
        >
          <Home className='w-7 text-white' />
          {!isCollapsed && <p className="text-white">Dashboard</p> }
        </NavLink>

        {/* Products Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsProductsOpen(!isProductsOpen)} // Toggle Products section
          >
            <span className="text-white">{isProductsOpen ? <ChevronUp /> : <ChevronDown />}</span>
            {!isCollapsed && <p>Products</p>}
          </button>
        
          {isProductsOpen && (
            <div className="pl-5">
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/add"
              >
                <CirclePlus className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>Add Products</p>}
              </NavLink>
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/list"
              >
                <ListOrdered className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>Inventory</p>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsOrdersOpen(!isOrdersOpen)} // Toggle Orders section
          >
            <span className="text-white">{isOrdersOpen ? <ChevronUp /> : <ChevronDown />}</span>
            {!isCollapsed && <p>Orders</p>}
          </button>
          {isOrdersOpen && (
            <div className="pl-5">
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/order"
              >
                <Package className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>All Orders</p>}
              </NavLink>
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/orders/pending"
              >
                <Package className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>Pending Orders</p>}
              </NavLink>
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/orders/completed"
              >
                <Package className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>Completed Orders</p>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsUsersOpen(!isUsersOpen)} // Toggle Users section
          >
            <span className="text-white">{isUsersOpen ? <ChevronUp /> : <ChevronDown />}</span>
            {!isCollapsed && <p>Users</p>}
          </button>
          {isUsersOpen && (
            <div className="pl-5">
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                to="/users"
              >
                <BookUser className='w-7 text-white' />
                {!isCollapsed && <p className='text-white'>All Users</p>}
              </NavLink>
            </div>
          )}
        </div>


        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          to='/banner'
        >
          <Home className='w-7 text-white' />
          {!isCollapsed && <p className="text-white">Banner</p> }
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
