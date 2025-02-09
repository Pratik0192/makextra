import UserModel from "../models/userModel.js";

const addToCart = async(req, res) => {
  try {
    const { userId, itemId, quantity } = req.body

    const userData = await UserModel.findById(userId)
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId] += quantity; // Increase by provided quantity
    } else {
      cartData[itemId] = quantity;
    }

    await UserModel.findByIdAndUpdate(userId, {cartData})

    res.json({ success: true, message: "Added to cart", cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message })
  }
}

const updateCart = async(req, res) => {
  try {
    const { userId, itemId, quantity } = req.body

    const userData = await UserModel.findById(userId)
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = { ...userData.cartData }; // Clone the cart object
    if (quantity > 0) {
      cartData[itemId] = quantity; // Update quantity
    } else {
      delete cartData[itemId]; // Remove item if quantity is 0
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated", cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message })
  }
}

const getUserCart = async(req, res) => {
  try {
    const { userId } = req.body

    const userData = await UserModel.findById(userId)
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = await userData.cartData;

    res.json({ success: true, cartData })

  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message })
  }
}

export { addToCart, updateCart, getUserCart }