import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  original_price: {
    type: Number,
    required: true
  },
  discounted_price: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  product_details: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
}, {
  timestamps : true
})

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;