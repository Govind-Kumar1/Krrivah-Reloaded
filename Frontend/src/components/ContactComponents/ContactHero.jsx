import React from "react";

export default function ContactHero() {
  return (
    <section className="relative bg-[#1A150F] text-[#EAE8E0] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Heading */}
        <div>
          <h1 className="text-5xl lg:text-7xl leading-[1.1] font-light tracking-tight">
           LET’S  <br /> CONNECT!
          </h1>
        </div>

        {/* Right Side - Paragraph */}
        <div className="flex items-end lg:justify-end">
          <p className="text-sm text-[#D4D1C7]">
            For project details or studio visits, drop us a line. We’d love to hear from you.

          </p>
        </div>
      </div>
    </section>
  );
}
