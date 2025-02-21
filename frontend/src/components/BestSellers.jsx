import React, { useContext, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import BestSellerProductItem from './BestSellerProductItem'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.4 },
  }),
}

const BestSellers = () => {

  const { products } = useContext(ShopContext)

  const carouselRef = useRef(null);

  // Scroll left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-10">
      <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>
        <Title text={'Best Sellers'} />
      </div>
      
      {/* Carousel Container */}
      <div className="relative">
        {/* Left Button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white shadow-md p-2 rounded-full z-10 hidden md:block"
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Product Carousel */}
        <motion.div
          initial="false"
          animate="visible"
          viewport={{ once: true, amount: 0.2 }}
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar px-2"
        >
          {products.map((item, index) => (
            <motion.div key={index} variants={itemVariants} custom={index} className="min-w-[200px] md:min-w-[250px] lg:min-w-[300px]">
              <BestSellerProductItem product={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Right Button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white shadow-md p-2 rounded-full z-10 hidden md:block"
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* View All Button */}
      <div className="flex items-center justify-center mt-4">
        <Link to='/allproducts' >
          <button className="cursor-pointer bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white px-8 py-3 rounded-md text-sm border border-white hover:border-[#DE3163]">
            View All
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BestSellers