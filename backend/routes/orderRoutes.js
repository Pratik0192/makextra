import express from "express"
import { placeOrder, allOrders, userOrders } from "../controller/orderController.js"
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//admin features
orderRouter.post('/list', allOrders);

//payment Features
orderRouter.post('/place',authUser, placeOrder);

//user feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
