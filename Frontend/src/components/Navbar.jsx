import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'DESIGN', path: '/design' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT', path: '/contact' },
  ];

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const getLinkClass = (isActive) => {
    const isHome = location.pathname === '/';
    const isAbout = location.pathname === '/about';
    const isDesign = location.pathname === '/design';

    if (isHome) {
      return `px-4 py-3 rounded-full transition underline-offset-8  
        ${isActive ? 'bg-black text-white' : 'text-white'}
        hover:bg-[#393F36] hover:text-white transition`;
    }
    if (isAbout || isDesign) {
      return `px-4 py-2 rounded-full transition underline-offset-8 decoration-2
        ${isActive ? 'bg-white text-black' : 'text-white'}
        hover:bg-[#393F36] hover:text-white transition`;
    }
    return `px-4 py-2 rounded-full transition underline-offset-8 decoration-2
      ${isActive ? 'bg-black text-white' : 'text-white'}
      hover:bg-black hover:text-white`;
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="flex justify-between items-center px-[5.5vw] py-[2.5vh]">

        {/* Left: Logo */}
 
 
        <div className="flex items-center gap-2 -ml-8 lg:-ml-20">
 
 
          <Link to="/">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-14 w-[220px] object-contain cursor-pointer"
            />
 
 
          </Link> 
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden lg:flex gap-[4vw] font-sans font-semibold text-[12px] leading-[100%] tracking-[2px] uppercase">
 
 
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => getLinkClass(isActive)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
 
 
        <div className="lg:hidden relative z-50">
 
 
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            {menuOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <img
                src="/Vector.png"
                alt="Menu"
                className="w-6 h-6 object-contain"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-6 px-[5.5vw] font-sans font-semibold text-[14px] leading-[100%] tracking-[2px] uppercase z-40"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => getLinkClass(isActive)}
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

export default Navbar;
