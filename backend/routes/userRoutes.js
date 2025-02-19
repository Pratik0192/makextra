import express from "express"
import { registerUser, loginUser, getUserProfile, adminLogin, getAllUsers, getUserOrders } from "../controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get("/profile", authMiddleware, getUserProfile)
userRouter.get("/allusers", getAllUsers);
userRouter.get("/orders/:userId", getUserOrders);

export default userRouter;