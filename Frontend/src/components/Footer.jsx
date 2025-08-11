import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 text-[#0E0E0E]">
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-16 py-6 gap-6">
        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <Link to="/">
            <img
              src="/Logo (2).png"
              alt="Krrivah Logo"
              className="h-20 w-40 object-contain"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-18 text-[10px] lg:text-sm font-semibold tracking-wider text-[#0E0E0E]">
          <li><Link to="/about" className="hover:text-gray-600">ABOUT</Link></li>
          <li><Link to="/projects" className="hover:text-gray-600">PROJECTS</Link></li>
          <li><Link to="/design" className="hover:text-gray-600">DESIGN</Link></li>
          <li><Link to="/blogs" className="hover:text-gray-600">BLOGS</Link></li>
          <li><Link to="/contact" className="hover:text-gray-600">CONTACT</Link></li>
        </ul>

        {/* Social Icons (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Bar: Mobile View Only */}
      <div className="flex flex-col lg:hidden justify-between items-start px-4 pb-2 text-xs text-gray-500">
        <div className="w-full flex justify-between items-center mb-2">
          {/* Left: Icons */}
          <div className="flex gap-6">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          </div>

          {/* Right: Privacy */}
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Common Bottom Row */}
      <div className="border-t border-gray-300 text-center py-3 px-4 text-xs text-gray-500">
        © Copyright 2025 Krrivah – All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
