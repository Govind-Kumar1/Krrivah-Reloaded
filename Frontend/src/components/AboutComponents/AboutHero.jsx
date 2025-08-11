import React from "react";

const AboutHero = () => {
  return (
    <section
 
 
      className="relative w-full h-[750px] pt-50 lg:pt-100 bg-cover bg-center bg-no-repeat flex items-center"
 
 
      style={{ backgroundImage: "url('/SCENE 16.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/44 z-10" />

      {/* Content */}
 
 
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-20 flex flex-col justify-center h-full">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full h-full">

          {/* Left Text */}
          <div className="text-white w-full lg:w-1/2 text-center lg:text-left flex items-end lg:pb-[100px]">
            <h1 className="text-left text-[49px] sm:text-[64px] lg:text-[80px] leading-tight font-serif">
 
 
             FOR A LIFE  <br />
              LESS ORDINARY
            </h1>
          </div>

          {/* Right Text */}
 

          <div className="text-white w-full lg:w-1/2 text-left lg:text-right max-w-[460px] mb-20 lg:mb-0 flex flex-col justify-end">

            {/* Mobile View (2-line custom break) */}
            <h2 className="text-[22px] font-serif block lg:hidden leading-snug">
 
 
               SPACES SHAPED TO ENHANCE <br />EVERYDAY LIFE.
            </h2>

            {/* Desktop View (single line with <br />) */}
 
            <h2 className="text-[28px] font-serif hidden md:block">
      SPACES SHAPED TO ENHANCE <br />EVERYDAY LIFE.
            </h2>

            <p className="text-sm md:text-base text-gray-200 leading-relaxed md:px-0 mt-2">
               Every home begins with a clear purpose and ends with a signature that’s unmistakably ours.

            </p>
          </div>
        </div>
      </div>
    </section>
 
  );
};

export default AboutHero;
