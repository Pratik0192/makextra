import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const SingleProduct = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, SetQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.images[0]);
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => SetQuantity((prev) => prev + 1);
  const decreaseQuantity = () => SetQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Function to navigate images in mobile carousel
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 ">
      <div className="flex flex-col sm:flex-row gap-10">
        
        {/* Product Images Section */}
        <div className="flex-1">
          
          {/* Mobile View: Image Carousel */}
          <div className="relative md:hidden">
            <img className="w-full rounded-md shadow-md" src={productData.images[currentIndex]} alt="Selected Product" />
            {/* Left Button */}
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              ❮
            </button>
            {/* Right Button */}
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              ❯
            </button>
          </div>

          {/* Desktop View: Main Image + Thumbnails */}
          <div className="hidden md:block">
            <img className="w-100 shadow-md" src={image} alt="Selected Product" />
            <div className="flex gap-2 mt-4">
              {productData.images.map((item, index) => (
                <img 
                  key={index} 
                  src={item} 
                  className={`w-35 h-35 object-cover cursor-pointer border ${image === item ? 'border-gray-600' : 'border-gray-300'}`} 
                  onClick={() => setImage(item)} 
                  alt={`Thumbnail ${index}`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <p className='text-gray-500 text-xs'>MAKEXTRA FASHION</p>
          <h2 className="text-xl md:text-4xl text-gray-900">{productData.name}</h2>
          
          {/* Pricing Section */}
          <div className="mt-3 flex items-center gap-4">
            <p className="text-lg text-gray-500 line-through">{currency}{productData.original_price}</p>
            <p className="text-xl text-[#DE3163]">{currency}{productData.discounted_price}</p>
            <span className="bg-[#DE3163] text-white px-4 py-2 text-sm rounded-3xl">Sale</span>
          </div>

          <p className='text-gray-500 text-xs mb-2'>Taxes included.</p>

          {/* Quantity Selector */}
          <div className="mt-4 flex flex-col items-start">
            <span className="mr-2 text-gray-500 text-xs mb-2">Quantity:</span>
            <div className="flex items-center border-2 border-gray-300 rounded-md">
              <button onClick={decreaseQuantity} className="px-3 py-1 text-lg">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-1 text-lg">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => addToCart(productData._id, quantity)} className="bg-transparent border border-black text-black px-6 py-3 rounded-md w-full sm:w-1/2 shadow-md hover:shadow-lg transition hover:border-2 ">
              Add to cart
            </button>
            <button className="bg-[#DE3163] text-white px-6 py-3 rounded-md w-full sm:w-1/2 shadow-md hover:shadow-lg transition hover:border-2 hover:border-[#DE3163]">
              Buy it now
            </button>
          </div>

          {/* Product Details (Dynamic) */}
          <div className="mt-6 py-2 md:py-5 lg:py-8 px-2 md:px-5 lg:px-8 border border-gray-300">
            <ul className="mt-2 text-gray-600 text-sm list-disc pl-5">
              {productData.product_details.map((detail, index) => (
                <li className='mt-3' key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct