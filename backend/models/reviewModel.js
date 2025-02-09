import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review_text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const ReviewModel = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default ReviewModel;