import ReviewModel from "../models/reviewModel.js";
import ProductModel from "../models/productModel.js";

// Add a Review
export const addReview = async (req, res) => {
  try {
    const { product_id, rating, review_text } = req.body;
    const user_id = req.user.id; // Extracted from authMiddleware

    // Check if the product exists
    const product = await ProductModel.findById(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Create a new review
    const newReview = new ReviewModel({ product_id, user_id, rating, review_text });
    await newReview.save();

    res.json({ success: true, message: "Review added successfully", review: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Reviews for a Product
export const getReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    const reviews = await ReviewModel.find({ product_id }).populate("user_id", "name");

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Review (Admin Only)
export const deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    
    // Check if review exists
    const review = await ReviewModel.findById(review_id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    // Allow only admin to delete
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await ReviewModel.findByIdAndDelete(review_id);
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};