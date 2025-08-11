import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeHero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/projects');
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/herobrand`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setSlides(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchHeroData();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-white">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-white">Error: {error}</div>;
  }

  if (slides.length === 0) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-white">No content available.</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Background Image */}
      <img
        loading="lazy"
        src={slides[current].imageUrl}
        alt={slides[current].title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

      {/* Desktop Number Indicators */}
      <div className="hidden lg:flex absolute z-20 top-1/2 -translate-y-1/2 left-6 text-[30px] tracking-wide leading-[3rem] flex-col gap-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={idx === current ? 'text-white font-semibold text-[45px]' : 'opacity-40'}
          >
            {(idx + 1).toString().padStart(2, '0')}
          </div>
        ))}
      </div>

      {/* Desktop Hero Content */}
      <div className="hidden lg:block absolute z-20 bottom-24 right-16 max-w-[28vw]  flex-col">
        <div>
          <h2 className="text-[2rem] font-light mb-6 tracking-wider font-merchant leading-tight">
            {slides[current].title}
          </h2>
          <p className="text-[16px] font-normal leading-5 text-white/90">
            {slides[current].description}
          </p>
        </div>
        <button
          onClick={handleViewAllClick}
          className="mt-14 px-6 py-2 border border-[#E7E9E640] rounded-full text-[16px] tracking-wide hover:bg-[#393F36] hover:text-white transition hover:cursor-pointer"
        >
          LEARN MORE
        </button>
      </div>

      {/* Desktop Brand Text */}
      <h1 className="hidden lg:block absolute z-20 bottom-20 left-6 font-merchant text-[100px] leading-[80%] tracking-[0px] uppercase">
        {/* ✅ FINAL UPDATE: Now using the 'brand' field from your data */}
        {slides[current].brand}
      </h1>

      {/* Mobile View */}
      <div className="lg:hidden relative z-20 flex flex-col justify-between min-h-screen px-6 py-10">
        {/* Brand */}
        <h1 className="mt-24 font-merchant text-7xl font-light leading-tight tracking-wide">
          {/* ✅ FINAL UPDATE: Also using the 'brand' field here for mobile */}
          {slides[current].brand}
        </h1>

        {/* Title */}
        <h2 className="text-4xl  uppercase tracking-wide mt-10">
          {slides[current].title}
        </h2>

        {/* Description */}
        <p className="text-[16px] font-light leading-relaxed text-white/90">
          {slides[current].description}
        </p>

        {/* Button + Pagination */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleViewAllClick}
            className="px-6 py-2 border border-gray-500 text-white text-sm font-semibold tracking-wide rounded-full hover:bg-gray-200 transition"
          >
            LEARN MORE
          </button>

          <div className="flex space-x-2">
            {slides.map((slide, idx) => (
              <span
                key={slide.id}
                className={`w-6 h-6 flex items-center justify-center font-semibold rounded-full ${
                  idx === current ? 'text-white text-2xl' : 'text-white/70 text-base'
                }`}
              >
                {(idx + 1).toString().padStart(2, '0')}
              </span> 
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;