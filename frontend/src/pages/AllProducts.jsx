import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Cross, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion"

const AllProducts = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]); // Min - Max price range
  const [sortBy, setSortBy] = useState('alphabetical'); // Default sorting
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);


  const categories = [...new Set(products.map((item) => item.category))];

  // Sorting logic
  const sortProducts = (products) => {
    let sortedProducts = [...products];

    switch (sortBy) {
      case 'priceLowHigh':
        sortedProducts.sort((a, b) => a.discounted_price - b.discounted_price);
        break;
      case 'priceHighLow':
        sortedProducts.sort((a, b) => b.discounted_price - a.discounted_price);
        break;
      case 'alphabetical':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'dateNewOld':
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'dateOldNew':
        sortedProducts.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  // Filter logic
  const filteredProducts = sortProducts(
    products.filter((product) => {
      return (
        (selectedCategory === '' || product.category === selectedCategory) &&
        product.discounted_price >= priceRange[0] &&
        product.discounted_price <= priceRange[1]
      );
    })
  );

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsCategoryOpen(false);
      setIsPriceOpen(false);
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className='mt-10 mb-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>
      <Title text={'All Products'} />

      {/* mobile filter button  */}
      <button
        className='md:hidden fixed bottom-5 right-5 z-50 bg-[#8c1018] text-white p-3 rounded-full shadow-lg'
        onClick={() => setIsFilterOpen(true)}
      >
        <Filter className='w-7' />
      </button>

      {/* Filter & Sort Section */}
      <div className='hidden md:flex justify-between items-center mt-5'>
        <div className='flex gap-6'>

          {/* Category Filter Dropdown */}
          <div className='relative dropdown'>
            <button 
              className='border border-gray-300 text-sm text-white px-4 py-2 rounded-lg bg-[#8C1018] shadow-md cursor-pointer hover:border hover:border-[#8C1018]'
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsPriceOpen(false);
                setIsSortOpen(false);
              }}
            >
              Category {selectedCategory ? `: ${selectedCategory}` : ''}
            </button>

            {isCategoryOpen && (
              <div className={`absolute left-0 mt-2 w-48 bg-[#8C1018] border border-[#8C1018] rounded-lg shadow-lg p-2 z-10 transition-all duration-200 ease-in-out ${isCategoryOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <p 
                  className='p-2 text-sm text-[white] cursor-pointer hover:bg-[#560e13]' 
                  onClick={() => setSelectedCategory('')}
                >
                  All
                </p>
                <hr className='border border-gray-200 my-2' />
                {categories.map((category, index) => (
                  <p 
                    key={index} 
                    className='p-2 cursor-pointer text-sm text-[white] hover:bg-[#560e13]'
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter Dropdown */}
          <div className='relative dropdown'>
            <button 
              className='border border-gray-300 text-sm text-white px-4 py-2 rounded-lg bg-[#8c1018] shadow-md cursor-pointer hover:border hover:border-[#8c1018]'
              onClick={() => {
                setIsPriceOpen(!isPriceOpen);
                setIsCategoryOpen(false);
                setIsSortOpen(false);
              }}
            >
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            </button>

            {isPriceOpen && (
              <div className='absolute left-0 mt-2 w-56 bg-[#8c1018] border border-gray-300 text-sm text-gray-600 rounded-lg shadow-lg p-3 z-10'>
                <p className='text-sm text-[white] mb-2'>Select Price Range</p>
                <hr className='border border-gray-200 my-2' />
                <div className='flex items-center gap-2'>
                  <input
                    type="number"
                    className="border border-white text-white px-2 py-1 w-20"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border border-white text-white px-2 py-1 w-20"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className='relative dropdown'>
          <button 
            className='border border-gray-300 text-[white] text-sm px-4 py-2 rounded-lg bg-[#8c1018] shadow-md cursor-pointer hover:border hover:border-[#8c1018]'
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsCategoryOpen(false);
              setIsPriceOpen(false);
            }}
          >
            Sort by
          </button>

          {isSortOpen && (
            <div className='absolute text-sm text-[white] right-0 mt-2 w-56 bg-[#8c1018] border border-[#8c1018] rounded-lg shadow-lg p-2 z-10'>
              <p 
                className={`p-2 cursor-pointer ${sortBy === 'priceLowHigh' ? 'bg-[#560e13]' : 'hover:bg-[#560e13]'}`}
                onClick={() => {
                  setSortBy('priceLowHigh');
                  setIsSortOpen(false);
                }}
              >
                Price: Low to High
              </p>
              <p 
                className={`p-2 cursor-pointer ${sortBy === 'priceHighLow' ? 'bg-[#560e13]' : 'hover:bg-[#560e13]'}`}
                onClick={() => {
                  setSortBy('priceHighLow');
                  setIsSortOpen(false);
                }}
              >
                Price: High to Low
              </p>
              <p 
                className={`p-2 cursor-pointer ${sortBy === 'alphabetical' ? 'bg-[#560e13]' : 'hover:bg-[#560e13]'}`}
                onClick={() => {
                  setSortBy('alphabetical');
                  setIsSortOpen(false);
                }}
              >
                Alphabetically: A to Z
              </p>
              <p 
                className={`p-2 cursor-pointer ${sortBy === 'dateNewOld' ? 'bg-[#560e13]' : 'hover:bg-[#560e13]'}`}
                onClick={() => {
                  setSortBy('dateNewOld');
                  setIsSortOpen(false);
                }}
              >
                Date: New to Old
              </p>
              <p 
                className={`p-2 cursor-pointer ${sortBy === 'dateOldNew' ? 'bg-[#560e13]' : 'hover:bg-[#560e13]'}`}
                onClick={() => {
                  setSortBy('dateOldNew');
                  setIsSortOpen(false);
                }}
              >
                Date: Old to New
              </p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 h-screen w-3/4 bg-white shadow-lg p-5 z-50 flex flex-col'
          >
            <button
              className='text-gray-600 text-lg self-end mb-5'
              onClick={() => setIsFilterOpen(false)}
            >
              <X className='text-red-500 w-7' />
            </button>

            <h3 className='text-lg font-semibold mb-3'>Filter Products</h3>

            {/* category filter */}

            <select 
              className='border border-gray-300 text-sm px-4 py-2 rounded-lg bg-white shadow-md w-full'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            {/* price filter */}

            <div className='mt-4'>
              <h4 className='text-sm font-medium mb-2'>Price Range</h4>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  className='border border-gray-300 px-2 py-1 w-20'
                  placeholder='Min'
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span>-</span>
                <input
                  type='number'
                  className='border border-gray-300 px-2 py-1 w-20'
                  placeholder='Max'
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>

            {/* Sorting Options */}
            <div className='mt-4'>
              <h4 className='text-sm font-medium mb-2'>Sort By</h4>
              <select
                className='border border-gray-300 text-sm px-4 py-2 rounded-lg bg-white shadow-md w-full'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='alphabetical'>A - Z</option>
                <option value='priceLowHigh'>Price: Low to High</option>
                <option value='priceHighLow'>Price: High to Low</option>
                <option value='dateNewOld'>Date: New to Old</option>
                <option value='dateOldNew'>Date: Old to New</option>
              </select>
            </div>

            <button
              className='mt-6 w-full bg-[#8c1018] text-white py-2 rounded-lg'
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))
        ) : (
          <p className='col-span-2 lg:col-span-3 text-center text-gray-500 mt-4'>
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
