import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, User2, ShoppingBasket, ShoppingCart } from "lucide-react";
import main_logo from "../assets/new_logo.png";
import { ShopContext } from "../context/ShopContext";
import profile_icon from '../assets/new_logo.png'
import MobileNavigation from "./MobileNavigation";
import Searchbar from "./Searchbar";
import cart_icon from '../assets/cart_icon.png'

const Navbar = () => {

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const { getCartCount, navigate, token, setToken, setCartItems, showSearch, setShowSearch } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  const toggleSupportDropdown = () => {
    setSupportDropdownOpen(!supportDropdownOpen);
  };

  return (
    <>
      {showSearch && <Searchbar /> }
      <nav className={`bg-[#8c1018] py-4 px-6 md:px-20 ${showSearch ? '' : 'sticky top-0 z-50'}`}>
        {/* Top Section */}
        <div className="flex justify-between items-center w-full">
          {/* Hamburger Icon (Visible only on Mobile) */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-[#E9B466]" /> : <Menu className="w-6 h-6 text-[#E9B466]" />}
          </button>

          {/* Search Icon for Desktop (Hidden on mobile) */}
          <div className="items-center hidden md:block">
            <Search 
              className="w-5 h-5 text-[white] cursor-pointer" 
              onClick={() => {
                console.log("Search icon clicked");
                setShowSearch(true);
              }}  
            />
          </div>

          {/* Logo (Always Centered) */}
            <div className="flex pl-9 justify-center items-center flex-1">
              <img src={main_logo} alt="Logo" className="h-12 md:h-18" />
            </div>

          {/* Right Icons (Move Right on Mobile) */}
          <div className="flex items-center space-x-4 ml-auto md:ml-0">

            <Search 
              className="md:hidden w-5 h-5 text-[white] cursor-pointer"
              onClick={() => {
                setShowSearch(true)
              }}
            />

            <div className="group relative hidden md:block">
              {/* <img onClick={() => token ? null : navigate('/login')} src={profile_icon} className="w-5 cursor-pointer" alt="" /> */}
              <User2 
                onClick={() => token ? null : navigate('/login')}
                className="w-8 cursor-pointer text-[white]"
              />
              {/* dropdown */}
              {token &&
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                  </div>
                </div>
              }
            </div>

            <div className="relative">
              <Link to='/cart'>
                <ShoppingCart className="w-8 cursor-pointer text-[white]" />
              </Link>
              
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e9b566] text-[#8c1018] text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex justify-center space-x-6 text-sm font-medium mt-4 mb-4">
          <li>
            <Link
              to="/"
              className={`cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/' ? "text-[#FFC877] after:w-full" : "hover:text-[#FFC877]"} `}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allproducts"
              className={`cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/allproducts' ? "text-[#FFC877] after:w-full" : "hover:text-[#FFC877]"} `}
            >
              New Arrivals
            </Link>
          </li>
          <li>
            <Link
              to="/collections"
              className={`cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/collections' ? "text-[#FFC877] after:w-full" : "hover:text-[#FFC877]"} `}
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              to="/track-order"
              className={`cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/track-order' ? "text-[#FFC877] after:w-full" : "hover:text-[#FFC877]"} `}
            >
              Track Your Order
            </Link>
          </li>

          {/* Support Dropdown */}
          <li className="relative">
            <button
              className="cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full"
              onClick={toggleSupportDropdown}
            >
              Support
            </button>
            {/* Dropdown Menu */}
            {supportDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-gray-600 z-10">
                <Link
                  to="/cancel"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Cancel Your Order
                </Link>
                <Link
                  to="/exchange-order"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Request or Exchange Request
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 "
                >
                  Contact Us
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link
              to="/sale"
              className={`cursor-pointer text-white hover:text-[#FFC877] relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[0.5px] after:bg-[white] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/sale' ? "text-[#FFC877] after:w-full" : "hover:text-[#FFC877]"} `}
            >
              Sale
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation Menu (Hidden by default) */}
        {menuOpen && (
          <MobileNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen}  />
        )}
      </nav>
    </>
    
  );
};

export default Navbar;
