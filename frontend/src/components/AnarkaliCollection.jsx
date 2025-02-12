import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const AnarkaliCollection = () => {

  const { products } = useContext(ShopContext)
  //console.log(products);

  const anarkaliProducts = products.filter(
    (product) => product.category === "Anarkali Collection"
  )
  
  return (
    <div className='mt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 '>
      <Title text={'Anarkali collection'} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {
          anarkaliProducts.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))
        }
      </div>
      <div className='flex items-center justify-center mt-4'>
        <button className='cursor-pointer bg-[#DE3163] text-white px-8 py-3 rounded-md text-sm border border-[white] hover:border hover:border-[#DE3163]'>view all</button>
      </div>
    </div>
  )
}

export default AnarkaliCollection