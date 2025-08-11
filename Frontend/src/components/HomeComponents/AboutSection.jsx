import React from 'react';
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-full min-h-screen bg-[#e5e6e1] py-[12vh] px-[2vw] font-sans flex flex-col lg:flex-row items-center">
      <div className="px-2 flex flex-col lg:flex-row w-full gap-8 lg:gap-22 justify-between items-center lg:items-start h-full">

        {/* Left Title Section */}
        <div className="w-full min-h-full lg:w-[28vw] flex flex-col gap-6 lg:gap-50 justify-between">
          <h3 className="text-[16px] lg:text-[22px] tracking-wide text-[#5F5F5F] mb-2 lg:mb-6">
            ABOUT
          </h3>
          <h2 className="text-[2rem] lg:text-[3rem] leading-tight tracking-wide font-serif text-[#2c2f28]">
            TIMELESS IN<br className="hidden lg:block" />
            DESIGN,<br className="hidden lg:block" />
            <span className="inline-block mt-1 lg:mt-2">DRIVEN BY</span><br className="hidden lg:block" />
          FORM & FUNCTION

          </h2>
        </div>

        {/* Center Image */}
        <div className="h-[470px] w-[90%] max-w-[80vw] sm:w-[345px] lg:w-[36vw] flex justify-center mt-6 lg:mt-0">
          <img 
            src="/SCENE 3.png"
            alt="About Krrivah"
            className="w-full h-auto lg:h-[630px] object-cover shadow-md"
          />
        </div>

        {/* Right Description */}
        <div className="w-full lg:w-[29vw] flex flex-col text-left mt-6 lg:mt-0 text-gray-700 text-sm leading-relaxed">
          <p className="mb-6 lg:mb-14 text-[14px] lg:text-[16px] text-[#393F36] leading-5">
             Krrivah is a philosophy built in stone, wood, and light—where architecture becomes an expression of intent. Every residence is designed with restraint and precision, rooted in Goa’s landscape yet timeless in form. With a deep reverence for detail, we craft spaces that speak to those who value rarity, refinement, and quiet distinction.

          </p>
          <button
            className="lg:mr-60 lg:self-center self-start px-4 lg:px-6 py-2 bg-white rounded-full font-bold text-[12px] lg:text-[16px] shadow-sm hover:bg-[#393F36] hover:text-white transition hover:cursor-pointer"
            onClick={() => navigate("/about")}
          >
            DISCOVER KRRIVAH
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
