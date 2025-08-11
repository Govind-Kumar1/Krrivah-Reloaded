import React from 'react';

const HeroProject = () => {
  return (
    <section className="bg-white text-black pt-20 md:pt-36 px-6 md:px-[5.5vw]">
      <div className="flex flex-col md:flex-row w-full">

        {/* Left Side - Heading */}
        <div className="flex-1 text-left">
          {/* Mobile View: stacked lines */}
          <div className="block md:hidden text-[#0B2204] font-light tracking-tight leading-[1.1] text-[44px] sm:text-[54px]">
            <p>FROM</p>
            <p>VISION TO</p>
          
            <p>FORM</p>
          </div>

          {/* Desktop View: single heading */}
          <h1 className="hidden md:block text-[100px] md:text-[6vw] leading-[100%] text-[#0B2204] font-light tracking-tight">
            FROM VISION<br />TO FORM
          </h1>
        </div>

        {/* Right Side - Description */}
        <div className="flex-1 mt-10 md:mt-0 md:flex md:items-end md:justify-end">
          <div className="max-w-sm w-full">
            {/* Mobile: centered, Desktop: right-aligned */}
            <p className="text-[15px] text-gray-800 font-sans text-center md:text-right leading-relaxed">
              Every project is a reflection of thoughtful design,<br />
              rooted in purpose and crafted with care.
            </p>
          </div>
        </div>

      </div>
    </section>
  ); 
};

export default HeroProject;
