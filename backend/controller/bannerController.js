import Banner from "../models/BannerModel.js";
import { v2 as cloudinary } from 'cloudinary'

export const addBanner = async (req, res) => {
    try {
      if (!req.file) {
        console.log("no file received");
        return res.status(400).json({ message: "No image uploaded" });
      }

      console.log("uploading file: ", req.file.path);
      
  
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });

      console.log("cloudinay response", result);
      
  
      // Save the image URL to MongoDB
      const newBanner = new Banner({ imageUrl: result.secure_url });
      await newBanner.save();
  
      res.status(201).json({ success: true, message: "Banner added successfully", banner: newBanner });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding banner", error: error.message });
    }
  };
  

export const getBanners = async(req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ banners });
    } catch (error) {
        res.status(500).json({ message: "Error fetching banners", error: error.message });
    }
}

export const deleteBanner = async(req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if(!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        const publicId = banner.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);

        await Banner.findByIdAndDelete(id);
        res.status(200).json({ message: "Banner deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting banner", error: error.message });
    }
}