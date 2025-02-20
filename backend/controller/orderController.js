import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import razorpay from "razorpay"
import crypto from "crypto";
import axios from "axios"

//generate shiprocket token
const getShiprocketToken = async() => {
  try {
    const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    })

    return response.data.token;

  } catch (error) {
    console.error("Shiprocket Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Shiprocket");
  }
}

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

    console.log("received payment verification request");
    console.log("razorpay order id", razorpay_order_id);
    console.log("razorpay payment id", razorpay_payment_id);
    console.log("razorpay signature", razorpay_signature);
    
    // Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`) 
      .digest("hex");

    console.log("🔹 Generated Signature:", generatedSignature);
    console.log("🔹 Provided Signature:", razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      console.log("❌ Payment verification failed: Invalid signature");
      return res.json({ success: false, message: "Invalid payment signature" });
    }

    // Fetch the actual order receipt
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("Received Razorpay Order ID:", razorpay_order_id);
    console.log("Stored Order Receipt:", orderInfo.receipt);

    if (!orderInfo.receipt) {
      console.log("❌ Error: Order receipt (MongoDB Order ID) is missing in Razorpay order.");
      return res.json({ success: false, message: "Order receipt is missing in payment data" });
    }

    // Update order in database using receipt (which is the actual order _id)
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderInfo.receipt }, // ✅ Use receipt instead
      { payment: true },
      { new: true }
    );

    console.log("🔹 Updated Order in Database:", updatedOrder);

    if (!updatedOrder) {
      console.log("❌ Error: No order found with the provided receipt ID.");
      return res.json({ success: false, message: "Order not found" });
    }

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    console.log("✅ Payment Verified and Order Updated Successfully!");
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

// shiprocket functions
const createShiprocketOrder = async(req, res) => {
  try {
    const { orderId } = req.body;

    const order = await OrderModel.findById(orderId);
    if(!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const token = await getShiprocketToken();

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: order._id,
        order_date: new Date().toISOString().split("T")[0], // Current date
        pickup_location: "Primary",
        billing_customer_name: order.shippingAddress.firstName,
        billing_last_name: order.shippingAddress.lastName,
        billing_address: order.shippingAddress.address,
        billing_city: order.shippingAddress.city,
        billing_pincode: order.shippingAddress.pinCode,
        billing_state: order.shippingAddress.state,
        billing_country: order.shippingAddress.country,
        billing_email: "customer@example.com", // Update as per order details
        billing_phone: order.shippingAddress.phone || "9876543210", // Add phone field in schema if missing
        shipping_is_billing: true,
        order_items: order.items.map((item) => ({
          name: item.name,
          sku: item._id,
          units: item.quantity,
          selling_price: item.price,
          discount: 0,
          tax: 0,
          hsn: "6101",
        })),
        payment_method: order.paymentMethod === "Razorpay" ? "Prepaid" : "COD",
        sub_total: order.amount,
        length: 10, // Replace with actual package dimensions
        breadth: 10,
        height: 10,
        weight: 1, // Replace with actual weight
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    order.shipment_id = response.data.shipment_id;
    await order.save();

    res.json({ success: true, message: "Order assigned to Shiprocket", shipment_id: response.data.shipment_id });

  } catch (error) {
    console.error("Error creating Shiprocket order:", error.response?.data || error.message);
    res.json({ success: false, message: "Failed to create Shiprocket order" });
  }
};

const generateAWB = async(req, res) => {
  try {
    const { orderId } = req.body;
    const order = await OrderModel.findById(orderId);
    if(!order || !order.shipment_id) {
      return res.json({ success: false, message: "Invalid order or shipment not created" });
    }

    const token = await getShiprocketToken();

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
      { shipment_id: order.shipment_id },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    order.awb_code = response.data.awb_code;
    await order.save();

    res.json({ success: true, message: "AWB assigned", awb_code: response.data.awb_code });

  } catch (error) {
    console.error("Error generating AWB:", error.response?.data || error.message);
    res.json({ success: false, message: "Failed to generate AWB" });
  }
}

const initiatePickup = async(req, res) => {
  try {
    const { orderId } = req.body;
    const order = await OrderModel.findById(orderId);
    if(!order || !order.shipment_id) {
      return res.json({ success: false, message: "Invalid order or shipment not created" });
    }

    const token = await getShiprocketToken();

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
      { shipment_id: order.shipment_id },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    res.json({ success: true, message: "Pickup scheduled" });

  } catch (error) {
    console.error("Error initiating pickup:", error.response?.data || error.message);
    res.json({ success: false, message: "Failed to initiate pickup" });
  }
}

const trackOrder = async (req, res) => {
  try {
    const { awb_code } = req.body;
    if (!awb_code) {
      return res.json({ success: false, message: "AWB code is required" });
    }

    const token = await getShiprocketToken();

    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb_code}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ success: true, tracking_data: response.data.tracking_data });
  } catch (error) {
    console.error("Error tracking order:", error.response?.data || error.message);
    res.json({ success: false, message: "Failed to track order" });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus, placeOrderRazorpay, verifyRazorpay, createShiprocketOrder, generateAWB, initiatePickup, trackOrder }