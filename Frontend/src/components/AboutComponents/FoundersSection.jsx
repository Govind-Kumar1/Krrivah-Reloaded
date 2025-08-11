import React from 'react';

const FoundersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto text-center px-6 md:px-14">
        {/* Top Headings */}
        <h4 className="text-2xl uppercase text-gray-900 tracking-wider mb-2">
          Meet The Founders
        </h4>
        <h2 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 leading-snug">
          The Minds Behind <br /> Krrivah
        </h2>

        {/* Founder Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 place-items-center">
          {/* Mr. Priyank Kumar */}
          <div className="text-left max-w-[400px]">
            <img 
              src="/founder1.png"
              alt="Mr. Priyank Kumar"
              className="w-full h-[300px] object-cover object-right"
            />
            <h3 className="mt-6 text-xl font-bold text-gray-800">Mr. Priyank Kumar</h3>
            <p className="text-[16px] text-gray-500 mt-1">Founder & CEO</p>
            <p className="mt-3 text-gray-700 text-[15px] leading-relaxed">
              A fashion designer and clothing manufacturer by background, Priyank brings a deep-rooted understanding of aesthetics, detail, and refined taste. His transition from couture to construction wasn’t a leap, it was a natural evolution. At Krrivah, he blends design intuition with an uncompromising eye for what defines modern luxury.
            </p>
          </div>

          {/* Mr. Pratik Nathani */}
          <div className="text-left max-w-[400px]">
            <img
              src="/founder2.png"
              alt="Mr. Pratik Nathani"
              className="w-full h-[300px] object-cover object-top"
            />
            <h3 className="mt-6 text-xl font-bold text-gray-800">Mr. Pratik Nathani</h3>
            <p className="text-[16px] text-gray-500 mt-1">COO</p>
            <p className="mt-3 text-gray-700 text-[15px] leading-relaxed">
              With a foundation in engineering and a passion for investment, Pratik pairs logic with lifestyle. His analytical edge ensures that every villa is not just beautiful but built to outperform. He brings a unique perspective on value, scale, and how luxury can be experienced beyond the visual.
            </p>
          </div>

          {/* Mr. Saurabh Anand */}
          <div className="text-left max-w-[400px]">
            <img
              src="/founder1.png" // Update this path if needed
              alt="Mr. Saurabh Anand"
              className="w-full h-[300px] object-cover object-top"
            />
            <h3 className="mt-6 text-xl font-bold text-gray-800">Mr. Saurabh Anand</h3>
            <p className="text-[16px] text-gray-500 mt-1">CFO</p>
            <p className="mt-3 text-gray-700 text-[15px] leading-relaxed">
              A numbers man with a taste for finer living, Saurabh ensures that the financial engine behind Krrivah is as solid as its foundations. His expertise in structuring premium ventures allows the brand to push boundaries, without losing sight of long-term trust and credibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
