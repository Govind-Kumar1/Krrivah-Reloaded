import React, { useState, useEffect } from "react";

const CarousalProject = ({ item }) => {
  const [current, setCurrent] = useState(0);

  const images = item?.images || []; // fallback to empty array

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 1500); // 1.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null; // Don't render carousel if no images

  return (
    <div className="relative w-full sm:w-[95%] h-[543px] overflow-hidden text-white sm:mx-auto">
      {/* Background Image */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 z-10" />

      {/* Slide Number Indicators */}
      <div
        className="absolute z-20 flex items-center md:items-start
        sm:top-1/2 sm:left-6 sm:-translate-y-1/2 
        sm:flex sm:flex-col 
        flex-row gap-2
        bottom-4 right-4"
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            className={
              idx === current
                ? "text-white font-semibold text-[45px]"
                : "opacity-80"
            }
          >
            {(idx + 1).toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarousalProject;
