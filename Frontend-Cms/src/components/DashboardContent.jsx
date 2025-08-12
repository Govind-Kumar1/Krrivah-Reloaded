import React, { useEffect, useState } from "react";
import StatCard from "./StatCard"; // StatCard component import karein
import { Users, FileText, LayoutPanelLeft } from "lucide-react"; // Icons import karein
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DashboardContent = () => {
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState();

  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData=async()=>{
    setLoading(true);
      try {
      const res = await axios.get(`${api_url}/api/dashboard`,{
        withCredentials:true,
      });
      setData(res.data.data || []);
      // console.log("Fetched Dashboard stats:", res.data.data);
    } catch (error) {
      console.error("Failed to fetch Dashboard stats", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="bg-white flex flex-col items-center justify-center h-64 gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
        <p className="text-sm text-black">Loading Stats...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Aap yahan grid layout ka istemal karke aur bhi cards add kar sakte hain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Enquiry Card */}
        <StatCard
          icon={<Users size={28} className="text-blue-500" />}
          value={data?.totalContacts ?? 0}
          title="ENQUIRY"
          subtitle="Enquiry Count"
        />

        {/* Project Card (Example) */}
        <StatCard
          icon={<LayoutPanelLeft size={28} className="text-green-500" />}
          value={data?.totalProjects ?? 0}
          title="PROJECTS"
          subtitle="Total Projects"
        />
        
        {/* Blog Card (Example) */}
        <StatCard
          icon={<FileText size={28} className="text-orange-500" />}
          value={data?.totalBlogs ?? 0}
          title="BLOGS"
          subtitle="Published Blogs"
        />

      </div>
    </div>
  ); 
};

export default DashboardContent;