import React, { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import logo from "/Logo.png"; // adjust path as needed
import { LogOut } from 'lucide-react';
import { useLocation, useNavigate, Link } from "react-router-dom"; // Link ko yahan import kiya hai

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const [homeDrawerOpen, setHomeDrawerOpen] = useState(false);

  const navLinks = [
    { name: "DASHBOARD", path: "/admin/dashboard" },
    { name: "HOME", path: "/admin/home", hasDrawer: true },
    { name: "DESIGN", path: "/admin/design" },
    { name: "PROJECT", path: "/admin/project" },
    { name: "BLOG", path: "/admin/blog" },
    { name: "STATISTICS", path: "/admin/statistics" },
    { name: "CONTACT", path: "/admin/contact" },
  ];

  const isActive = (path) => {
    // Exact match for dashboard, startsWith for others
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Hamburger menu (mobile only) */}
      <div className="bg-[#393F36] md:hidden p-4 flex justify-between space-x-4">
        <div className="flex space-x-4">
          <button onClick={() => setOpenMobile(true)} className="text-white">
          <Menu size={28} />
        </button>
        <div className="text-white text-lg font-medium">
          Administrator Panel
        </div>
        </div>
        <button title="Logout" className="hover:text-red-400 text-white">
            <LogOut size={22} />
          </button>
      </div>

      {/* Sidebar (desktop or mobile full screen) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transition-transform duration-300 
        min-h-screen
          ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        {/* Header with logo */}
        <div className="flex items-center gap-2 px-6 py-4">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        {/* Close button (mobile) */}
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setOpenMobile(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mt-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <div
                className={`flex items-center justify-between mx-2 px-4 py-2 text-sm font-semibold cursor-pointer rounded-md
                ${
                  isActive(link.path)
                    ? "bg-[#373D35] text-white"
                    : "text-[#373D35] hover:bg-gray-100"
                }`}
                onClick={() => {
                  if (link.hasDrawer) {
                    setHomeDrawerOpen(!homeDrawerOpen);
                  } else {
                    navigate(link.path);
                    setOpenMobile(false); // Close mobile menu on navigate
                  }
                }}
              >
                <span>{link.name}</span>
                {link.hasDrawer && <Plus size={16} />}
              </div>

              {/* Home Drawer Links */}
              {link.name === "HOME" && homeDrawerOpen && (
                <div className="pl-12 flex flex-col gap-1 text-sm font-medium text-[#373D35] py-2">
                  <Link
                    to="/admin/banner"
                    onClick={() => setOpenMobile(false)}
                    className={`py-1 hover:text-black ${
                      isActive("/admin/banner") ? "font-bold text-black" : ""
                    }`}
                  >
                    Banner
                  </Link>
                  <Link
                    to="/admin/gallery"
                    onClick={() => setOpenMobile(false)}
                    className={`py-1 hover:text-black ${
                      isActive("/admin/gallery") ? "font-bold text-black" : ""
                    }`}
                  >
                    Gallery
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
