import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/getByPage/design`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("Fetched Gallery Data:", result);

        if (Array.isArray(result.data)) {
          setImages(result.data);
        } else {
          throw new Error("Invalid response format: Expected 'data' to be an array");
        }
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (loading) {
    return (
      <section className="m-4 text-center py-16">
        <p>Loading Gallery...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="m-4 text-center py-16">
        <p className="text-red-500">Could not load gallery: {error}</p>
      </section>
    );
  }

  return (
    <section className="m-4">
      <div className="grid grid-cols-12 md:grid-cols-11 grid-rows-6 md:grid-rows-5 gap-2 md:gap-4">

        {/* Only update src and alt dynamically. Layout stays exactly the same. */}
        {[
          "col-start-1 row-start-1 col-span-3 row-span-2 md:col-start-1 md:row-start-1 md:col-span-3 md:row-span-2",
          "col-start-4 row-start-1 col-span-2 row-span-2 md:col-start-4 md:row-start-1 md:col-span-2 md:row-span-2",
          "col-start-6 row-start-1 col-span-4 row-span-4 md:col-start-6 md:row-start-1 md:col-span-4 md:row-span-4",
          "col-start-10 row-start-1 col-span-3 row-span-2 md:col-start-10 md:row-start-1 md:col-span-3 md:row-span-2",
          "col-start-10 row-start-3 col-span-3 row-span-2 md:col-start-10 md:row-start-3 md:col-span-3 md:row-span-2",
          "col-start-1 row-start-3 col-span-2 row-span-2 md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-2",
          "col-start-1 row-start-5 col-span-2 row-span-2 md:col-start-1 md:row-start-5 md:col-span-2 md:row-span-2",
          "col-start-3 row-start-3 col-span-3 row-span-3 md:col-start-3 md:row-start-3 md:col-span-3 md:row-span-3",
          "col-start-3 row-start-6 col-span-3 md:col-start-3 md:row-start-6 md:col-span-3 md:row-span-1",
          "col-start-6 row-start-5 col-span-3 row-span-2 md:col-start-6 md:row-start-5 md:col-span-3 md:row-span-2",
          "col-start-9 row-start-5 col-span-4 row-span-2 md:col-start-9 md:row-start-5 md:col-span-4 md:row-span-2"
        ].map((className, index) => {
          const image = images[index];
          return (
            <img
              key={index}
              src={image?.imageUrl || `/fallback${index + 1}.png`}
              alt={image?.component || `Gallery Image ${index + 1}`}
              className={`${className} w-full h-full object-cover`}
              loading="lazy"
            />
          );
        })}

      </div>

      {/* Get In Touch Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <p className="max-w-[400px] text-gray-600 text-[16px] leading-relaxed">
          Our architecture listens to the land, to your lifestyle, to what truly lasts.
        </p>
        <button onClick={()=>navigate("/contact")} className="mt-8 px-6 py-3 border border-gray-200 rounded-full text-[#0B2204] font-semibold hover:bg-[#393F36] hover:text-white transition hover:cursor-pointer">
          GET IN TOUCH
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
