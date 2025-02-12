import React from 'react'
import { Link } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <div>
      <ul className="md:hidden flex flex-col items-center space-y-4 bg-white shadow-md mt-4 p-4 rounded-lg">
        <li>
          <Link
            to="/"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            New Arrivals
          </Link>
        </li>
        <li>
          <Link
            to="/collections"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Collections
          </Link>
        </li>
        <li>
          <Link
            to="/track-order"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Track Your Order
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Support
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="cursor-pointer text-gray-500 hover:text-gray-900 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Sale
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileNavigation