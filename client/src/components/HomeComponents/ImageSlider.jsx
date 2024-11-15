import React, { useState } from "react";
import HomeImg1 from "../../assets/home-img.jpg";
import HomeImg2 from "../../assets/home-img2.jpg";
import HomeImg3 from "../../assets/home-img3.jpg";

const ImageSlider = () => {
  const images = [HomeImg1, HomeImg2, HomeImg3]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loops back to first image
  };

  // Go to previous image
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative h-[50vh] w-full overflow-hidden">
      {/* Wrapper for the images */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${images.length * 100}vw`, // Ensures the container's width fits all images
          transform: `translateX(-${currentIndex * 100}vw)`, // Slide based on current index
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="h-full w-screen flex-shrink-0" // Ensures each image takes full screen width
          >
            <img
              src={image}
              alt={`Home Background ${index + 1}`}
              className="h-full w-full object-cover" // Full height and width
            />
          </div>
        ))}
      </div>

      {/* Left and Right Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer"
      >
        &#10094; {/* Left Arrow */}
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl cursor-pointer"
      >
        &#10095; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default ImageSlider;
