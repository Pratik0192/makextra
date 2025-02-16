import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const featureNames = [
  "2500+ orders completed",
  "100% quality assurance",
  "Get 20% off on your first purchase | Use Code: WELCOME20",
];

const TopOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featureNames.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featureNames.length) % featureNames.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featureNames.length);
  };

  return (
    <div className="relative bg-gradient-to-b from-[#560e13] to-[#8c1018] text-white py-2 md:py-4 flex items-center justify-center overflow-hidden">
      {/* Left Button */}
      <button 
        onClick={handlePrev} 
        className="absolute left-4 md:left-18 text-white hover:text-gray-300 transition duration-300"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Sliding Text Container */}
      <div className="w-full overflow-hidden flex justify-center">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${featureNames.length * 100}%` }}
        >
          {featureNames.map((feature, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 text-center text-sm px-4"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button 
        onClick={handleNext} 
        className="absolute right-4 md:right-18 text-white hover:text-gray-300 transition duration-300"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default TopOffers;
