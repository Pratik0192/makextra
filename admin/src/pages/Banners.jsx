import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false)

  // Fetch banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/banner/all`);
      setBanners(response.data.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload banner
  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true)

    try {
      await axios.post(`${backendUrl}/api/banner/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      setPreview(null);
      fetchBanners(); // Refresh banners
    } catch (error) {
      console.error("Error uploading banner:", error);
    } finally {
        setLoading(false);
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/banner/delete/${id}`);
      fetchBanners(); // Refresh banners
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <div className="container mx-auto p-1 md:p-4">
      <h2 className="text-xl font-bold mb-4">Manage Banners</h2>

      {/* Upload Banner */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-semibold mb-2">Upload New Banner</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-50 md:w-80 " />
        {preview && <img src={preview} alt="Preview" className="h-32 mt-2 rounded-lg shadow-md" />}
        <button
          onClick={handleUpload}
          className={`mt-3 text-white px-4 py-2 rounded ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Display Banners */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="relative">
            <img src={banner.imageUrl} alt="Banner" className="w-full object-cover rounded-lg shadow-md" />
            <button
              onClick={() => handleDelete(banner._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
