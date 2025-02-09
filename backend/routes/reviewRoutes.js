import express from "express"
import { addReview, getReviews, deleteReview } from "../controller/reviewController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.get("/:product_id", getReviews);
reviewRouter.delete("/:review_id", authMiddleware, deleteReview);

export default reviewRouter;