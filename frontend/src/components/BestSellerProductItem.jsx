import { Star } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const BestSellerProductItem = ({product}) => {

  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="bg-white rounded-sm overflow-hidden cursor-pointer">
      <Link to={`/product/${product._id}`}>
        <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full relative"
        >
          <img
            src={hovered ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-68 md:h-120 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute bottom-3 right-3 bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white text-xs px-3 py-1 rounded-2xl">SALE</p>
          {/* <div className="absolute bottom-3 left-3 flex mt-1 sm:mt-2 text-sm sm:text-base text-[#DE3163] font-semibold">
            <Star className="w-6 h-6 mr-2" /> {product.rating}
          </div> */}
        </div>
        <div className="p-2 sm:p-3 md:p-4">
          <h3 className="text-xs text-gray-800 transition-all duration-200 hover:underline underline-offset-4">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1 sm:mt-2">
            <p className="text-sm sm:text-base text-[#4B6A75] line-through">₹{product.original_price}</p>
            <p className="text-sm sm:text-base text-[#103948]">₹{product.discounted_price}</p>
          </div>
          <p className="text-xs text-gray-500">Makextra Fashion</p>
        </div>
      </Link>

      {/* ✅ Button moved outside of Link */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Stops default behavior of Link
          addToCart(product._id, quantity);
        }}
        className="mt-2 border-b border-x border-gray-600 rounded-md w-full py-3 hover:border-2"
      >
        Add to cart
      </button>
    </div>
  )
}

export default BestSellerProductItem