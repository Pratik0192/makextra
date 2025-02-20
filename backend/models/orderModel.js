import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: {type: Array, required: true},
  amount: {type: Number, required: true},
  shippingAddress: {type: Object, required: true},
  billingAddress: {type: Object, required: true},
  status: {type: String, required: true, default: 'Order Placed'},
  paymentMethod: {type: String, required: true},
  payment: {type: Boolean, required: true, default: false},
  shipment_id: { type: String, default: null },  // ✅ Store Shiprocket shipment ID
  awb_code: { type: String, default: null }  // ✅ Store Airway Bill (AWB) number
},{timestamps: true})

const OrderModel = mongoose.models.order || mongoose.model('order', OrderSchema);

export default OrderModel;