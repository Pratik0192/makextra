import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-1 md:p-4">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Image</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Category</th>
              <th className="p-3 border border-gray-300">Original Price</th>
              <th className="p-3 border border-gray-300">Discounted Price</th>
              <th className="p-3 border border-gray-300">Stock</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="odd:bg-gray-100 even:bg-white text-center hover:bg-gray-200 transition">
                  <td className="p-3 border border-gray-300">{index + 1}</td>
                  <td className="p-3 border border-gray-300">
                    <img className="w-12 h-12 object-cover mx-auto rounded-md" src={product.images[0]} alt={product.name} />
                  </td>
                  <td className="p-3 border border-gray-300">
                    <Link className="cursor-pointer hover:underline" to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-3 border border-gray-300">{product.category}</td>
                  <td className="p-3 border border-gray-300">{currency}{product.original_price}</td>
                  <td className="p-3 border border-gray-300">{currency}{product.discounted_price}</td>
                  <td className={`p-3 border border-gray-300 font-semibold ${product.stock > 5 ? "text-green-600" : "text-red-500"}`}>
                    {product.stock}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center border border-gray-300">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
