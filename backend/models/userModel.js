import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_number: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // User roles
  cartData: {type: Object, default: {}}
},{
  timestamps : true
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;