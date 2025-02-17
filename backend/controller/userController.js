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

const adminLogin = (req,res) => {
  try {
    const { email, password } = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({success: true, token})
    } else {
      res.json({ success: false, message: "invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const getAllUsers = async(req, res) => {
  try {
    const users = await UserModel.find().select('-password');

    if(users.length === 0) {
      return res.status(404).json({ success: true,  message: "no users found"});
    }

    res.json({ success: true, users })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export { registerUser, loginUser, getUserProfile, adminLogin, getAllUsers };
