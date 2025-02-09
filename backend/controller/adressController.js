import AddressModel from "../models/addressModel.js";

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const { street_address, city, state, country, pin_code, label } = req.body;
    const user_id = req.user.id;

    const newAddress = new AddressModel({
      user_id,
      street_address,
      city,
      state,
      country,
      pin_code,
      label
    });

    await newAddress.save();
    res.json({ success: true, message: "Address added successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all addresses of a user
export const getAddresses = async (req, res) => {
  try {
    const user_id = req.user.id;
    const addresses = await AddressModel.find({ user_id });

    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user_id = req.user.id;

    const updatedAddress = await AddressModel.findOneAndUpdate(
      { _id: id, user_id },
      updatedData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const deletedAddress = await AddressModel.findOneAndDelete({ _id: id, user_id });

    if (!deletedAddress) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
