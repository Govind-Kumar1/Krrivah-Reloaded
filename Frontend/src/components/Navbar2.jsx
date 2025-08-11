import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'DESIGN', path: '/design' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const linkClasses = (isActive) =>
    `px-4 py-3 rounded-full transition-all duration-200 ${
      isActive ? 'bg-black text-white' : 'text-black'
    }`;

  return (
    <nav>
      <div className="top-0 z-20 w-full border-b border-gray-200 text-gray-900 flex justify-between items-center px-[5.5vw] pt-[2.5vh] py-3">
        {/* Logo */}
 
 
        <div className="flex items-center gap-2 -ml-10 lg:-ml-20">
 
 
          <Link to="/">
            <img
              src="/Logo (2).png"
              alt="Logo"
              className="h-14 w-[220px] object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
 

        <div className="hidden lg:flex gap-[4vw] font-sans font-semibold text-[12px] leading-[100%] tracking-[2px] uppercase">
 
 
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => linkClasses(isActive)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
 
 
        <div className="lg:hidden relative z-50">
 
 
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
            {menuOpen ? (
              <X size={28} />
            ) : (
              <img
                src="/Vector2.png" 
                alt="Menu"
                className="w-6 h-6 object-contain text-contrast"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
 
 
            className="lg:hidden flex flex-col items-center gap-4 px-[5.5vw] pb-6 font-sans font-semibold text-[12px] leading-[100%] tracking-[2px] uppercase bg-white border-b border-gray-200 z-40"
 
 
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => linkClasses(isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar2;
