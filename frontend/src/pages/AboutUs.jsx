import React from 'react'
import QueryForm from '../components/QueryForm'

const AboutUs = () => {
  return (
    <div className='mx-8 md:mx-16 lg:mx-32 xl:mx-96 mt-5 md:mt-5'>
      <h2 className='text-[#103948] text-2xl lg:text-5xl mb-8'>About us</h2>
      <div className="text-gray-500">
        <p className='mt-10'>
          Welcome to Makextra, your go-to destination for women’s fashion that celebrates individuality and style. We believe in empowering women to express themselves through high-quality, trend-forward pieces that are as versatile as they are unique. Our collection is carefully curated with a blend of timeless designs and fresh, modern touches, giving you pieces that effortlessly fit into every occasion in your life.
        </p>
        <p className='mt-5'>At Makextra, we’re committed to sustainability and quality. Each item is crafted with attention to detail, using materials that not only look great but are made to last. We work closely with our designers and suppliers to ensure that every product aligns with our values of style, comfort, and responsible production.</p>
        <p className='mt-5'>Our mission is simple: to make fashion accessible, fun, and inspiring. We love to see our customers feel confident and stylish in our pieces. Join us on this journey to redefine fashion—one outfit at a time.</p>
        <p className='mt-5'>Thank you for being part of the Makextra family!</p>
      </div>
      <QueryForm />
    </div>
  )
}

export default AboutUs