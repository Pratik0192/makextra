import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import razorpay from "razorpay"
import crypto from "crypto";

const currency = "inr"

//gateway initialised
const razorpayInstance = new razorpay( {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

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

const placeOrderRazorpay = async (req, res) => {
  try {
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
      paymentMethod: "Razorpay",
      payment: false
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order }); 

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`) 
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid payment signature" });
    }

    // Fetch the actual order receipt
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("Received Razorpay Order ID:", razorpay_order_id);
    console.log("Stored Order Receipt:", orderInfo.receipt);

    // Update order in database using receipt (which is the actual order _id)
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderInfo.receipt }, // ✅ Use receipt instead
      { payment: true },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Payment Successful", order: updatedOrder });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order data for frontend
const userOrders = async(req, res) => {
  try {
    const {userId}  = req.body
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

export { placeOrder, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyRazorpay }