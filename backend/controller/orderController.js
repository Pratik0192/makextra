import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

const currency = "inr"

//for cod
const placeOrder = async(req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging
    const { userId, items, amount, shippingAddress, billingAddress } = req.body;

    if (!shippingAddress) {
      return res.json({ success: false, message: "Delivery address is required" });
    }

    const orderData = {
      userId,
      items,
      amount,
      shippingAddress,
      billingAddress,
      paymentMethod: "COD",
      payment: false
    }

    const newOrder = new OrderModel(orderData)
    await newOrder.save()

    await UserModel.findByIdAndUpdate(userId, {cartData : {}})

    res.json({ success: true, message: "Order Placed" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

//user order data for frontend
const userOrders = async(req, res) => {
  try {
    const { userId } = req.body

    const orders = await OrderModel.find({ userId })
    res.json({ success: true, orders })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

//all orders for the admin panel 
const allOrders = async(req, res) => {
  try {

    const orders = await OrderModel.find({})
    res.json({ success: true, orders })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

const updateStatus = async(req, res) => {
  try {
    const { orderId, status } = req.body

    await OrderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status Updated" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, allOrders, userOrders, updateStatus }