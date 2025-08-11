import React, { useState, useEffect } from "react";
import {  Plus } from "lucide-react";
import { FiEdit,FiXSquare } from "react-icons/fi";

import BannerForm from "./BannerForm"; // Your form component
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";


const ManageBanners = () => {
  const [mode, setMode] = useState("table"); // 'table', 'add', 'edit'
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // New states for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all banners from the backend
  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${api_url}/api/heroBrand`);
      setData(res.data);
    } catch (err) {
      setError("Failed to fetch banners. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchBanners();
  }, []);

  // Function to handle deleting a banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setLoading(true);
      try {

        await axios.delete(`${api_url}/api/heroBrand/${id}`, { withCredentials: true });
        fetchBanners(); // Refetch data to update the UI
      } catch (err) {
        setLoading(false);
        alert("Failed to delete banner.");
        console.error(err);
      }
      setLoading(false);
    }
  };

  // Function to handle form submission for both add and edit modes
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (mode === "add") {
        // For adding, we send multipart/form-data
        const apiFormData = new FormData();
        Object.keys(formData).forEach((key) => {
          apiFormData.append(key, formData[key]);
        });
        await axios.post(`${api_url}/api/heroBrand`, apiFormData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (mode === "edit") {
        // For editing, we send JSON (assuming no image update for now)
        // Note: If your PUT route supports image updates, this needs to be multipart/form-data too.
        await axios.put(`${api_url}/api/heroBrand/update/${editingItem.id}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchBanners(); // Refetch data on success
    } catch (err) {
      setLoading(false);
      alert(`Failed to ${mode} banner.`);
      console.error(err);
    } finally {
      setLoading(false);
      setMode("table");
      setEditingItem(null);
    }
  };

  // Function to toggle the active status
  const handleToggleStatus = async (item) => {
    setLoading(true);
    try {
      // Your updateHeroBrand controller will handle the update
      console.log(item);
      
      await axios.put(
        `${api_url}/api/heroBrand/update/${item.id}`,
        { isActive: !item.isActive },
        { withCredentials: true }
      );
      fetchBanners(); // Refetch to show the change
    } catch (err) {
      setLoading(false);
      alert("Failed to update status.");
      console.error(err);
    }
    setLoading(false);
  };

  // Render loading or error state
if (loading) {
  return (
    <div className=  "bg-white flex flex-col items-center justify-center h-64 gap-2">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
      <p className="text-sm text-black">Loading Banners...</p>
    </div>
  );
}  
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Banner</h2>
          {mode === "table" && (
            <button
              onClick={() => setMode("add")}
              className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200"
            >
              <Plus size={16} /> Add New Record
            </button>
          )}
        </div>

        {/* Content */}
        <div className="">
          {mode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-sm text-black">
                    <th className="border p-3 font-semibold">Id</th>
                    <th className="border p-3 font-semibold">BRAND NAME</th>
                    <th className="border p-3 font-semibold">Image</th>
                    <th className="border p-3 font-semibold">Title</th>
                    <th className="border p-3 font-semibold">Description</th>
                    {/* <th className="border p-3 font-semibold text-center">
                      Active
                    </th> */}
                    <th className="border p-3 font-semibold text-center">
                      Edit
                    </th>
                    <th className="border p-3 font-semibold text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 text-sm">
                      <td className="border p-3">{item.id}</td>
                      <td className="border p-3">{item.brand}</td>
                      <td className="border p-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-24 h-auto object-cover"
                        />
                      </td>
                      <td className="border p-3">{item.title}</td>
                      <td className="border p-3">{item.description}</td>
                      {/* <td className="border p-3 text-center">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`px-3 py-1 text-xs rounded-full text-white ${
                            item.isActive ? "bg-green-500" : "bg-gray-400"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </button>
                      </td> */}
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setMode("edit");
                          }}
                          className="hover:text-blue-600"
                        >
                          <FiEdit className='text-black w-5 h-5' size={22} />
                        </button>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="hover:text-red-600"
                        >
                          <FiXSquare className='text-black' size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <BannerForm
              mode={mode}
              item={editingItem}
              onCancel={() => {
                setMode("table");
                setEditingItem(null);
              }}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBanners;
