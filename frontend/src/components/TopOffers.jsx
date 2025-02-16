import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const featureNames = [
  "2500+ orders completed",
  "100% quality assurance",
  "get 20% off on your first purchase | use Code : WELCOME20",
];

const TopOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % featureNames.length);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featureNames.length) % featureNames.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featureNames.length);
  };

  return (
    <div className="relative bg-gradient-to-b bg-[#560e13] to-[#8c1018] text-white py-2 flex items-center justify-center">
      <button 
        onClick={handlePrev} 
        className="absolute left-4 md:left-15 text-[white] hover:text-gray-300 transition duration-300"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="overflow-hidden">
        <div 
          className="whitespace-nowrap transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featureNames.map((feature, index) => (
            <div 
              key={index} 
              className="inline-block border w-full text-center text-[white] text-sm px-4"
            >
              {feature}  
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleNext} 
        className="absolute right-4 md:right-15 text-[white] hover:text-gray-300 transition duration-300"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default TopOffers;
