import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const KurtiCollection = () => {

  const { products } = useContext(ShopContext)
  console.log(products);

  return (
    <div className='mt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 '>
      <Title text={'Kurtis Collection'} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {
          products.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))
        }
      </div>
    </div>
  )
}

export default KurtiCollection