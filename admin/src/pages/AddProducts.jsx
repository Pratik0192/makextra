import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import uploadArea from "../assets/upload_area.png"

const AddProducts = () => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [image6, setImage6] = useState(false);

  const [name, setName] = useState("");
  const [original_price, setOriginalPrice] = useState("");
  const [discounted_price, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [product_details, setProductDetails] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("")

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(false);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list');
        if(response.data.success) {
          const uniqueCategories = [
            ...new Set(response.data.products.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching Categories", error);
      }
    };
    fetchCategories();
  }, [])
  
  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name);
      formData.append("original_price", original_price);
      formData.append("discounted_price", discounted_price);
      formData.append("stock", stock);
      formData.append("product_details", product_details);
      formData.append("category", category);
      formData.append("rating", rating);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      image5 && formData.append("image5", image5);
      image6 && formData.append("image6", image6);

      const response = await axios.post(backendUrl + "/api/product/add", formData);

      if(response.data.success) {
        toast.success(response.data.message)
        setName("");
        setOriginalPrice("");
        setDiscountPrice("");
        setStock("");
        setProductDetails("");
        setCategory("")
        setRating("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setImage5(false)
        setImage6(false)
        
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className='w-20'
                src={!eval(`image${num}`) ? uploadArea : URL.createObjectURL(eval(`image${num}`))}
                alt=''
              />
              <input
                onChange={(e) => eval(`setImage${num}(e.target.files[0])`)}
                type='file'
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='name' required />
      </div>
      <div className="w-full">
        <p className="mb-2">Original Price</p>
        <input onChange={(e) => setOriginalPrice(e.target.value)} value={original_price} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='original price' required />
      </div>
      <div className="w-full">
        <p className="mb-2">Discounted Price</p>
        <input onChange={(e) => setDiscountPrice(e.target.value)} value={discounted_price} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='Discounted Price' required />
      </div>
      <div className="w-full">
        <p className="mb-2">Stock</p>
        <input onChange={(e) => setStock(e.target.value)} value={stock} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='stock' required />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Details</p>
        <textarea className='w-full max-w-[500px] px-3 py-2' onChange={(e) => setProductDetails(e.target.value)} value={product_details} placeholder='enter product details in comma separated format. Example: Product Detail 1, Product Detail 2, Product Detail 3, etc' required/>
      </div>
      
      {/* category selection */}
      <div className="w-full">
        <p className="mb-2">Category</p>
        <select 
          className='w-full max-w-[500px] px-3 py-2' 
          value={category} 
          onChange={(e) => {
            if( e.target.value === "new") {
              setNewCategory(true);
              setCategory("")
            } else {
              setNewCategory(false)
              setCategory(e.target.value)
            }
          }}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
          <option value="new">Add new Category</option>
        </select>
      </div>

      {/* show input if add new category is selected */}
      {newCategory && (
        <div className="w-full">
          <p className="mb-2">New Category</p>
          <input 
            type="text" 
            placeholder='Enter new Category'
            className='w-full max-w-[500px] px-3 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      )}

      <div className="w-full">
        <p className="mb-2">Rating</p>
        <input onChange={(e) => setRating(e.target.value)} value={rating} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='rating' required />
      </div>


      <button className='w-28 py-3 mt-4 bg-[#8c1018] text-white' type='submit'>ADD</button>
    </form>
  )
}

export default AddProducts