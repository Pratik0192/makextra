import express from "express"
import { placeOrder, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyRazorpay } from "../controller/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//admin features
orderRouter.post('/list', allOrders);
orderRouter.post('/status', updateStatus);

//payment Features
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//user feature
orderRouter.post('/userorders', authUser, userOrders);

//verify payment
orderRouter.post('verifyrazorpay', authUser, verifyRazorpay)

export default orderRouter;
