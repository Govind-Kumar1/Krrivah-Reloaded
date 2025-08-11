import React from "react";
import Sidebar from "./Sidebar"; // Sidebar ka path adjust karein
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";


const AdminLayout = ({ breadcrumbs, children }) => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      await axios.post(`${api_url}/api/auth/logout`,{},{
      withCredentials: true,
    });
    navigate('/')
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative md:flex min-h-screen bg-[#D6D6D6]">
      <Sidebar />
      {/* Main Content Area (Sidebar ke bagal wala) */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar (Dark wala) */}
        <header className="hidden bg-[#393F36]  text-white p-4 md:flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Administrator Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="hover:text-red-400"
          >
            <LogOut size={22} />
          </button>
        </header>

        {/* Breadcrumb Bar (Halka grey wala) */}
        <div className="bg-[#D6D6D6] px-6 py-3">
          <p className="text-sm font-semibold text-black ">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {/* Agar link hai to 'a' tag, warna simple text */}
                {crumb.link ? (
                  <a href={crumb.link} className="hover:underline">
                    {crumb.name}
                  </a>
                ) : (
                  <span>{crumb.name}</span>
                )}
                {/* Aakhri item ke baad '>' nahi dikhana */}
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2">&gt;</span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Page ka Asli Content (jaise Blog ka table/form) */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
