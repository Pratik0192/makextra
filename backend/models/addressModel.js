import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  street_address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pin_code: { type: String, required: true },
  label: { type: String, enum: ["Home", "Work", "Other"], default: "Home" } // Address type
}, {
  timestamps : true
})

const AddressModel = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default AddressModel;