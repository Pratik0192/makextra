import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); // For redirecting after successful update
  const [productData, setProductData] = useState(null);
  const [newDetail, setNewDetail] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);
        const product = response.data.products.find((product) => product._id === productId);
        if (product) {
          setProductData(product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...productData.product_details];
    updatedDetails[index] = value;
    setProductData((prev) => ({ ...prev, product_details: updatedDetails }));
  };

  const addNewDetail = () => {
    if (newDetail.trim()) {
      setProductData((prev) => ({
        ...prev,
        product_details: [...prev.product_details, newDetail],
      }));
      setNewDetail('');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('original_price', productData.original_price);
      formData.append('discounted_price', productData.discounted_price);
      formData.append('stock', productData.stock);
      formData.append('category', productData.category);
      formData.append('rating', productData.rating);
      formData.append('product_details', productData.product_details.join(','));

      images.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
      });

      const response = await axios.put(
        `${backendUrl}/api/product/update/${productId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        alert('Product updated successfully!');
        navigate('/list'); // Redirect to the product list page
      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Something went wrong');
    }
  };

  if (!productData) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-1 md:mt-10 p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="font-medium">Original Price:</label>
          <input
            type="number"
            name="original_price"
            value={productData.original_price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="font-medium">Discounted Price:</label>
          <input
            type="number"
            name="discounted_price"
            value={productData.discounted_price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="font-medium">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="font-medium">Rating:</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
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
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="p-2 border rounded w-full mt-2"
        />
      </div>

      <button
        onClick={updateProduct}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Product
      </button>
    </div>
  );
};

export default SingleProduct;
