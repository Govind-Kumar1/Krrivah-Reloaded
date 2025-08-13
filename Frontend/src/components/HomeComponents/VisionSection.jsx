// src/components/VisionSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard.jsx"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const VisionSection = () => { 
  const [visionData, setVisionData] = useState({
    title: "Our Vision",
    headline: "Design That   <br />Lives With  <br />the Land.",
    description: "At the heart of every Krrivah project lies a design-first approach. Our process blends architectural heritage with modern living, rooted in sustainable materiality, refined aesthetics, and intentional spaces.",
    imageUrl: "/SCENE 2.png",
    stats: [],
  });
  const navigate  = useNavigate();

  const handleViewAllClick= ()=>{
    navigate("/contact");
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stat`);
        // Assuming you might fetch other vision data later, 
        // it's good practice to update state like this.
        setVisionData(prevData => ({
          ...prevData,
          stats: res.data.data || [],
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);
  
  // Helper function to parse the unit string from the API
  const extractStatParts = (unit) => {
    const numeric = parseFloat(unit) || 0;
    const suffix = unit.replace(/[\d.\s]/g, "");
    return { numeric, suffix };
  };

  return (
    <section className="w-full bg-black text-white px-6 lg:px-10 py-10">
      {/* Top Vision Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12">
        <div className="w-full lg:w-2/3 flex justify-center">
          <img
            src={visionData.imageUrl}
            alt="Aerial Vision"
            className="w-[350px] lg:w-full h-[250px] lg:h-[500px] rounded-lg object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 text-left flex flex-col mt-6 lg:mt-0 items-start">
          <p className="text-[16px] lg:text-[18px] tracking-widest text-gray-400 uppercase mb-2 sm:mb-4">
            {visionData.title}
          </p>
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-merchant text-[#E3E8E0] leading-tight mb-4 sm:mb-6"
            dangerouslySetInnerHTML={{ __html: visionData.headline }} 
          />
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 sm:mb-6 w-full max-w-[420px] break-words">
            {visionData.description}
          </p>
          <button  onClick={handleViewAllClick} className="bg-white text-[#0B2204] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition hover:bg-[#393F36] hover:text-white hover:cursor-pointer">
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Bottom Stats - Dynamic */}
      <div className="mt-20 text-white text-left">
        {/* Unified grid for all screen sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {visionData.stats.map((stat, index) => {
            const { numeric, suffix } = extractStatParts(stat.unit);
            return (
              <StatCard
                key={index}
                end={numeric}
                suffix={suffix}
                label={stat.description}
              />
            );
          })} 
        </div>
      </div>
    </section>
  );
};

export default VisionSection;