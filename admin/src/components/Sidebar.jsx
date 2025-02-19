import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { CirclePlus,LayoutDashboard, Image, List, Menu, Package, ChevronDown, ChevronUp, User, ListOrdered, BookUser, Home } from "lucide-react";
import { motion } from "framer-motion"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control sidebar collapse
  const [isProductsOpen, setIsProductsOpen] = useState(false); // State to toggle Products section
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // State to toggle Orders section
  const [isUsersOpen, setIsUsersOpen] = useState(false); // State to toggle Users section

  return (
    <div className={`min-h-screen transition-all duration-300 fixed md:relative top-0 left-0 ${isCollapsed ? 'w-[5%]' : 'w-[18%]'} bg-[#8c1018]`}>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <button
          className="text-white px-2 py-1"
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle the sidebar collapse
        >
          <Menu className='w-6' />
        </button>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          to='/'
        >
          <LayoutDashboard className='w-7 text-white' />
          {!isCollapsed && <p className="text-white">Dashboard</p> }
        </NavLink>

        {/* Products Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsProductsOpen(!isProductsOpen)} // Toggle Products section
          >
            <div className="flex items-center gap-3">
              <Package className='w-7 text-white' />
              {!isCollapsed && <p>Products</p>}
            </div>
            {!isCollapsed && (isProductsOpen ? <ChevronUp /> : <ChevronDown />)}
          </button>
        
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isProductsOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-5">
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/add">
                <CirclePlus className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>Add Products</p>}
              </NavLink>
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/list">
                <ListOrdered className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>Inventory</p>}
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Orders Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsOrdersOpen(!isOrdersOpen)} // Toggle Orders section
          >
            <div className="flex items-center gap-3">
              <Package className="w-7 text-white" />
              {!isCollapsed && <p>Orders</p>}
            </div>
            {!isCollapsed && (isOrdersOpen ? <ChevronUp /> : <ChevronDown />)}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isOrdersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-5">
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/order">
                <Package className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>All Orders</p>}
              </NavLink>
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/pending">
                <Package className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>Pending Orders</p>}
              </NavLink>
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/orders/completed">
                <Package className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>Completed Orders</p>}
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Users Section */}
        <div className="flex flex-col">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            onClick={() => setIsUsersOpen(!isUsersOpen)} // Toggle Users section
          >
            <div className="flex items-center gap-3">
              <BookUser className="w-7 text-white" />
              {!isCollapsed && <p>Users</p>}
            </div>
            {!isCollapsed && (isUsersOpen ? <ChevronUp /> : <ChevronDown />)}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isUsersOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-5">
              <NavLink className="flex items-center gap-3 px-3 py-2 rounded-lg" to="/users">
                <BookUser className="w-7 text-white" />
                {!isCollapsed && <p className='text-white'>All Users</p>}
              </NavLink>
            </div>
          </motion.div>
        </div>


        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          to='/banner'
        >
          <Image className='w-7 text-white' />
          {!isCollapsed && <p className="text-white">Banner</p> }
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
