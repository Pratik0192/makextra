import express from "express"
import { placeOrder, allOrders, userOrders, updateStatus } from "../controller/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//admin features
orderRouter.post('/list', allOrders);
orderRouter.post('/status', updateStatus);

//payment Features
orderRouter.post('/place',authUser, placeOrder);

//user feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
