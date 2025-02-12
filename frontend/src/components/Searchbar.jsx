import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const { search, showSearch, setSearch, setShowSearch, products } = useContext(ShopContext);

  // Filter products based on search input (case insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`fixed top-10 h-20 md:h-40 bg-white w-full z-50 flex items-center justify-center px-6 shadow-lg transition-all duration-700 ease-in-out transform ${showSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
      
      {/* Search Input */}
      <div className="border w-full max-w-2xl flex items-center border-b border-gray-300 rounded-md px-2 relative">
        <input
          type="text" 
          placeholder="Search for Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 text-md outline-none text-gray-600"
        />
        <Search className="w-5 text-gray-500" />
        
      </div>
      <button onClick={() => setShowSearch(false)} className="ml-4">
        <X className="w-6 h-6 text-gray-500" />
      </button>

      {/* Dropdown Results */}
      {search && (
        <div className="w-full max-w-2xl bg-white border border-gray-200 mt-2 rounded-md shadow-md absolute top-25 left-101">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link 
                to={`/product/${product._id}`} 
                key={product._id} 
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearch('');
                  setShowSearch(false);
                }}
              >
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                <p className="text-gray-700 text-sm">{product.name}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 p-3 text-center">No matching products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
