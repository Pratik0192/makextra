import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile_number } = req.body;

    // Validate input
    if (!name || !email || !password || !mobile_number) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Check if mobile number is already used
    const existingMobile = await UserModel.findOne({ mobile_number });
    if (existingMobile) {
      return res.status(400).json({ success: false, message: "Mobile number already registered" });
    }

    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ name, email, password: hashedPassword, mobile_number });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check if product is already in cart
    const itemIndex = user.cartData.findIndex(item => item.product_id.toString() === product_id);

    if (itemIndex > -1) {
      // If product exists, update quantity
      user.cartData[itemIndex].quantity += quantity;
    } else {
      // Else, add new product
      user.cartData.push({ product_id, quantity });
    }

    await user.save();
    res.json({ success: true, message: "Product added to cart", cart: user.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Product from Cart
const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Remove product from cart
    user.cartData = user.cartData.filter(item => item.product_id.toString() !== product_id);

    await user.save();
    res.json({ success: true, message: "Product removed from cart", cart: user.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get all cartData for a particular User
const getAllCartData = async(req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate("cartData.product_id");

    if(!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success : true, cart: user.cartData });
  } catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export { registerUser, loginUser, getUserProfile, addToCart, removeFromCart, getAllCartData };
