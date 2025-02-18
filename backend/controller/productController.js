import { v2 as cloudinary } from "cloudinary"
import ProductModel from "../models/productModel.js"

//create a new product
const addProduct = async(req, res) => {
  try {
    const { name, original_price, discounted_price, stock, product_details, category, rating } = req.body;

    const productDetailsArray = product_details ? product_details.split(",") : [];

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    const image5 = req.files.image5 && req.files.image5[0]
    const image6 = req.files.image6 && req.files.image6[0]

    const images = [image1, image2, image3, image4, image5, image6].filter((item) => item !== undefined)

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url;
      })
    )

    const newProduct = new ProductModel({
      name,
      original_price,
      discounted_price,
      stock,
      images: imagesUrl,
      product_details: productDetailsArray,
      category,
      rating
    })

    await newProduct.save();
    res.json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

//get all the products
const listProducts = async(req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products })
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

//delete a product
const removeProduct = async(req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message: "Product removed"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

//get a single product by id
const singleProduct = async(req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

const updateProduct = async(req, res) => {
  try {
    
    const { productId } = req.params;
    const { name, original_price, discounted_price, stock, product_details, category, rating } = req.body;

    //convert product_details from cmma separated string to array 
    const productDetailsArray = Array.isArray(product_details) ? product_details : product_details.split(",");

    //handle image uploads if any
    const images = req.files ? Object.values(req.files).map(file => file[0]) : [];

    let imagesUrl = [];
    if(images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async(item) => {
          let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
          return result.secure_url;
        })
      )
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        original_price,
        discounted_price,
        stock,
        category,
        rating,
        product_details: productDetailsArray,
        ...(imagesUrl.length > 0 && { images: imagesUrl }), // Update images only if new ones are uploaded
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct }