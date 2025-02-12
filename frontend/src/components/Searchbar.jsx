import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';

const Searchbar = () => {
  const { search, showSearch, setSearch, setShowSearch, products } = useContext(ShopContext);

  console.log(products);

  return (
    <div className={`fixed top-10 h-20 md:h-40 bg-white w-full z-50 flex items-center justify-center px-6 shadow-lg transition-all duration-700 ease-in-out transform ${showSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <div className="border w-full max-w-2xl flex items-center border-b border-gray-300 rounded-md px-2">
        <input
          type="text" 
          placeholder='Search for Products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 p-3 text-md outline-none text-gray-600'
        />
        <Search className='w-5 text-gray-500' />
      </div>
      <button onClick={() => setShowSearch(false)} className='ml-4'>
        <X className='w-6 h-6 text-gray-500' />
      </button>
    </div>
  );
};

export default Searchbar;
