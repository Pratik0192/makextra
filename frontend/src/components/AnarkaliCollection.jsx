import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnarkaliCollection = () => {

  const { products } = useContext(ShopContext)
  //console.log(products);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.4 },
    }),
  }

  const anarkaliProducts = products.filter(
    (product) => product.category === "Anarkali Collection"
  )
  
  return (
    <div className='mt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 '>
      <Title text={'Anarkali collection'} />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
      >
        {
          anarkaliProducts.map((item, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <ProductItem product={item} />
            </motion.div>
            
          ))
        }
      </motion.div>
      <div className='flex items-center justify-center mt-4'>
        <Link to='/allproducts' >
          <button className="cursor-pointer bg-gradient-to-r from-[#560e13] to-[#8c1018] text-white px-8 py-3 rounded-md text-sm border border-white hover:border-[#DE3163]">
            View All
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AnarkaliCollection