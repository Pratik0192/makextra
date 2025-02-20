import express from "express"
import { placeOrder, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyRazorpay, createShiprocketOrder, generateAWB, initiatePickup, trackOrder } from "../controller/orderController.js"
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
orderRouter.post('/verifyrazorpay', authUser, verifyRazorpay)

//shiprocket
orderRouter.post('/shiprocket/create-order', createShiprocketOrder);
orderRouter.post('/shiprocket/generate-awb', generateAWB);
orderRouter.post('/shiprocket/initiate-pickup', initiatePickup);
orderRouter.post('/shiprocket/track-order', trackOrder);

export default orderRouter;
