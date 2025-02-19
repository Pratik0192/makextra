import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero_1 from "../assets/hero_1.webp";
import hero_2 from "../assets/hero_2.webp";
import hero_3 from "../assets/hero_3.webp";
import hero_4 from "../assets/hero_4.webp";
import hero_5 from "../assets/hero_5.webp";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";



//const images = [hero_1, hero_2, hero_3, hero_4, hero_5];

const Hero = () => {
  const { backendUrl } = useContext(ShopContext);
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchBannerImage = async() => {
    try {
      const response = await axios.get(backendUrl + '/api/banner/all');
      setImages(response.data.banners)
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  } 

  useEffect(() => {
    fetchBannerImage();
  }, [])
  
  useEffect(() => {
    if(images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Slide ${index}`}
            className="w-full h-auto flex-shrink-0"
          />
        ))}
      </div>

      {/* Controls & Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3">
        {/* Navigation Buttons */}
        {/* <div className="flex space-x-6">
          <button onClick={handlePrev} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600">
            <ChevronRight size={24} />
          </button>
        </div> */}

        {/* Indicators */}
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-[#ffc877]" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
