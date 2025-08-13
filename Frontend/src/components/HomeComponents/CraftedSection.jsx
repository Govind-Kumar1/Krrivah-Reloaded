import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { use } from "react";

// ⏱ Custom hook for controlled interval
function useInterval(callback, delay) {
  const saved = useRef();
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const CraftedSection = () => {
  const [images, setImages] = useState([]);
  const [start, setStart] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  // 🔄 Fetch images from backend
   const handleViewAllClick = () => { 
    navigate("/projects");
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/image/getByPage/home`);
        const fetchedImages = res.data?.data || [];
         
        setImages(fetchedImages.filter(Boolean)); // Clean nulls
      } catch (error) {
        console.error("Error fetching images for home:", error);
      }
    };
    fetchImages();
  }, []);

  // 📱 Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1025);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shiftRight = () => setStart((prev) => (prev + 1) % images.length);
  useInterval(shiftRight, isPaused || images.length === 0 ? null : 2000);

  const visibleCount = isMobile ? 2 : 4;
  const carouselImages = Array.from({ length: visibleCount }, (_, i) =>
    images[(start + i) % images.length]
  );

  return (
    <section className="w-full py-12 flex flex-col items-center bg-white relative">
      <h2 className="text-center text-[40px] lg:text-[64px] leading-tight font-serif text-[#0B2204] mb-10">
        CRAFTED WITH PURPOSE. <br /> DEFINED BY DESIGN.
      </h2>

      {/* Carousel */}
      <div className="w-full">
        <div className="flex flex-row justify-center gap-4 lg:flex-nowrap lg:gap-[50px]">
          {carouselImages.length === 0 ? (
            <p className="text-gray-500 text-center">No images available.</p>
          ) : (
            carouselImages.map((img, idx) => {
              const imageUrl = img?.imageUrl || img?.url; // ✅ Fallback
              if (!imageUrl) return null;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`w-[150px] h-[180px] lg:w-[521px] lg:h-[511px] overflow-hidden ${
                    idx % 2 === 1 ? "mt-0 lg:mt-20" : "mt-4"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={img.alt || `Crafted Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Text + Button */}
      <div className="mt-12 w-full max-w-[340px] text-center px-4">
        <p className="text-sm text-[#5F5F5F] mb-6">
          From materials to masterplans, every element is considered. Our
          approach to design is rooted in balance between beauty and utility,
          architecture and experience.
        </p>
        <button onClick={handleViewAllClick} className="border-[1px] border-[#0B2204] text-[#0B2204] font-semibold px-6 py-3 rounded-full hover:bg-[#393F36] hover:text-white transition hover:cursor-pointer">
          EXPLORE ALL PROJECTS
        </button>
      </div>
    </section>
  );
};

export default CraftedSection;
