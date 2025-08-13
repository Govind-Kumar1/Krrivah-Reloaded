import React, { useEffect, useState } from "react";
import StatCard from "../HomeComponents/StatCard.jsx"; // Adjust the path if needed
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * OurRoots Component
 * * This component displays the "Our Roots" section of the website.
 * It features a two-column layout with text on the left and a layered image composition on the right.
 * * Key Responsive Features:
 * 1. Staged Layout: Uses `lg` and `xl` breakpoints to adapt the layout gracefully from mobile to large desktops.
 * 2. Controlled Overlap: The overlapping image effect is adjusted at different screen sizes to prevent crashing into text content.
 * 3. Proportional Sizing: Image dimensions are defined responsively to scale correctly with the screen size.
 * 4. Dynamic Stats: Fetches and displays key company statistics from a backend API.
 */
const OurRoots = () => {
  const navigate = useNavigate();
  const [visionData, setVisionData] = useState({
    title: "Our Vision",
    headline: "IN HARMONY WITH <br /> FORM, LIGHT, AND <br /> LANDSCAPE.",
    description:
      "At the heart of every Krrivah project lies a design-first approach. Our process blends architectural heritage with modern living, rooted in sustainable materiality, refined aesthetics, and intentional spaces.",
    imageUrl: "/SCENE 2.png",
    stats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stat`);
        setVisionData((prevData) => ({
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
    <section className="bg-[#EAE8E5] w-full px-6 lg:px-10 py-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-24 items-start">
        {/* Left Content */}
        <div className="flex-1">
          <p className="text-sm uppercase tracking-wide text-gray-700 mb-4">
            Our Roots
          </p>
          <h2 className="text-[44px] lg:text-[58px] leading-tight font-serif text-[#2B2B2B] mb-12">
            THE STORY <br /> BEHIND <br /> KRRIVAH
          </h2>
          <p className="text-sm font-semibold text-[#2B2B2B] mb-14">
            Krrivah is more than a real estate venture — it’s a philosophy of
            thoughtful living.
          </p>
          <p className="text-[15px] text-gray-700 leading-relaxed mb-3 max-w-lg">
            Born from the desire to blend conscious design with purposeful
            development, Krrivah crafts spaces that respect land, elevate
            lifestyle, and build long-term value. With deep roots in South
            India’s cultural and architectural heritage, we strive to create
            environments where every brick tells a story — of craft, community,
            and care.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-5 py-2 mt-6 bg-white text-black text-sm font-semibold rounded-full hover:bg-[#393F36] hover:text-white hover:cursor-pointer transition "
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Right Image Layer (Fully Responsive) */}
        <div className="relative pl-10 lg:pl-0 lg:w-1/2 xl:w-[708px] lg:h-auto xl:h-[760px] flex-shrink-0">
          <img
            src="/SCENE 3.png"
            alt="Background"
            className="w-full h-full object-cover filter grayscale"
          />
          <img
            src="/SCENE 8V1.png"
            alt="Interior"
            // This staged positioning and sizing is key to the responsiveness
            className="absolute object-cover top-[25%] -left-4 lg:-left-16 xl:-left-[20%] w-[127px] h-[167px] lg:w-[280px] lg:h-[365px] xl:w-[328px] xl:h-[430px] shadow-lg"
          />
        </div>
      </div>

      {/* Bottom Stats - Dynamic */}
      <div className="max-w-[1800px] mx-auto mt-20 text-white text-left">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {visionData.stats.map((stat, index) => {
            const { numeric, suffix } = extractStatParts(stat.unit);
            return (
              <StatCard
                className="bg-gray-400"
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

export default OurRoots;