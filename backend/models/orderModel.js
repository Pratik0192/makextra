import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: {type: Array, required: true},
  amount: {type: Number, required: true},
  deliveryAddress: {type: Object, required: true},
  billingAddress: {type: Object, required: true},
  status: {type: String, required: true, default: 'Order Placed'},
  paymentMethod: {type: String, required: true},
  payment: {type: Boolean, required: true, default: false}
},{timestamps: true})

const OrderModel = mongoose.models.order || mongoose.model('order', OrderSchema);

export default OrderModel;