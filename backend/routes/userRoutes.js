import express from "express"
import { registerUser, loginUser, getUserProfile, addToCart, removeFromCart, getAllCartData } from "../controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.post("/cart/add", authMiddleware, addToCart);
userRouter.post("/cart/remove", authMiddleware, removeFromCart);
userRouter.get("/cart/get", authMiddleware, getAllCartData);

export default userRouter;