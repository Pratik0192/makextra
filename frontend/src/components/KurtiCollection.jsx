import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
      >
        {
          products.map((item, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <ProductItem product={item} />
            </motion.div>
          ))
        }
      </motion.div>
      <div className='flex items-center justify-center mt-4'>
        <button className='cursor-pointer bg-[#DE3163] text-white px-8 py-3 rounded-md text-sm border border-[white] hover:border hover:border-[#DE3163]'>view all</button>
      </div>
    </div>
  )
}

export default KurtiCollection