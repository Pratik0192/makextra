import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const KurtiCollection = () => {

  const { products } = useContext(ShopContext)

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.4 },
    }),
  }

  return (
    <div className='mt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 '>
      <Title text={'Kurtis Collection'} />
      <motion.div 
        initial="false"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
      >
        {
          products.length > 0 ? (
            products.map((item, index) => (
              <motion.div key={item._id} variants={itemVariants} custom={index}>
                <ProductItem product={item} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading products...</p>
          )
        }
      </motion.div>
      <div className='flex items-center justify-center mt-4'>
        <Link to='/allproducts'>
          <button className="cursor-pointer bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white px-8 py-3 rounded-md text-sm border border-white hover:border-[#DE3163]">
            View All
          </button>
        </Link>
      </div>
    </div>
  )
}

export default KurtiCollection