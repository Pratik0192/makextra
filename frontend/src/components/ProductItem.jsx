import { Star } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { currency } = useContext(ShopContext);

  const imageToShow = hovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-sm overflow-hidden cursor-pointer">
        <div 
          onMouseEnter={() => product.images[1] && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full relative"
        >
          <img 
            src={imageToShow}
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute bottom-3 right-3 bg-[#E9B466] text-[#8C1018] text-xs px-3 py-1 rounded-2xl">SALE</p>
        </div>
        <div className="p-2 sm:p-3 md:p-4">
          <h3 className="text-base sm:text-xs md:text-sm lg:text-md text-gray-800 transition-all duration-200 hover:underline underline-offset-4">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1 sm:mt-2">
            <p className="text-sm sm:text-base text-[#4B6A75] line-through">
              {currency} {product.original_price}
            </p>
            <p className="text-sm sm:text-base text-[#103948]">
              {currency} {product.discounted_price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
