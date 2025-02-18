import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backendUrl } from '../App';

const SingleProduct = () => {

  const { productId } = useParams()
  const [ productData, setProductData ] = useState(null);
  const [newDetail, setNewDetail] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);

        const product = response.data.products.find((product) => product._id === productId);

        console.log(productId);
        
        if (product) {
          setProductData(product);
          console.log("product data:", product);
        } else {
          console.log("product data not found");
        }
      } catch (error) {
        console.log("error in fetching products:", error.response?.data || error.message);
      }
    };

    fetchProducts();

  }, [productId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  const handleDetailChange = (index, value) => {
    const updateDetails = [ ...productData.product_details ];
    updateDetails[index] = value;
    setProductData((prev) => ({ ...prev, product_details: updateDetails }))
  };

  const addNewDetail = () => {
    if(newDetail.trim()) {
      setProductData((prev) => ({
        ...prev,
        product_details: [...prev.product_details, newDetail],
      }));
      setNewDetail('');
    }
  }

  if( !productData) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>
  }
  console.log(productId);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Name:</label>
          <input type="text" value={productData.name} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-medium">Category:</label>
          <input type="text" value={productData.category} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-medium">Original Price:</label>
          <input type="number" value={productData.original_price} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-medium">Discounted Price:</label>
          <input type="number" value={productData.discounted_price} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-medium">Stock:</label>
          <input type="number" value={productData.stock} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-medium">Rating:</label>
          <input type="number" value={productData.rating} className="w-full p-2 border rounded" />
        </div>
      </div>
      <h3 className="mt-4 font-semibold">Product Details</h3>
      {productData.product_details.map((detail, index) => (
        <input
          key={index}
          type="text"
          value={detail}
          onChange={(e) => handleDetailChange(index, e.target.value)}
          className="p-2 border rounded w-full mt-2"
        />
      ))}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newDetail}
          onChange={(e) => setNewDetail(e.target.value)}
          placeholder="Add new detail"
          className="p-2 border rounded w-full"
        />
        <button onClick={addNewDetail} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <div className="mt-6">
        <label className="font-medium">Images:</label>
        <div className="flex gap-2 mt-2">
          {productData.images.map((image, index) => (
            <img key={index} src={image} alt="Product" className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      </div>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Update Product
      </button>
    </div>
  )
}

export default SingleProduct