import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiXSquare } from "react-icons/fi";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { Pencil, X, Plus, Loader2 } from "lucide-react";
import GalleryForm from "./GalleryForm"; // Assuming this component exists
import api from "../../services/api.js"; // Import the generic api instance with corrected path

const ManageGallery = () => { 
  const [mode, setMode] = useState("table");
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api_url}/api/image/getByPage/home`, {
          withCredentials: true,
        });
        setData(res.data.data || []); 
        // console.log(res.data.data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchData();
  }, []); 

  // Submit handler
  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pageName", form.pageName);
      formData.append("component", form.component);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (mode === "add") {
        await axios.post(`${api_url}/api/image`, formData, {
          withCredentials: true, 
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (mode === "edit" && editingItem?.id) {
        // console.log(editingItem);

        await axios.put(`${api_url}/api/image/${editingItem.id}`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Refresh gallery list
      const res = await axios.get(`${api_url}/api/image/getByPage/home`, {
        withCredentials: true,
      });
      setData(res.data.data || []);
      setMode("table");
      setEditingItem(null);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };
  const handleToggleActive = async (item) => {
    setLoading(true);
    try {
      const updatedIsActive = !item.isActive;
      await axios.put(
        `${api_url}/api/image/${item.id}`,
        { isActive: updatedIsActive },
        { withCredentials: true }
      );

      // Update local state only if successful
      setData((prev) =>
        prev.map((d) =>
          d.id === item.id ? { ...d, isActive: updatedIsActive } : d
        )
      );
    } catch (error) {
      console.error("Failed to update isActive status:", error);
      alert("Error updating status. Try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      setLoading(true);
      try {
        await axios.delete(`${api_url}/api/image/${id}`, {
          withCredentials: true,
        });
        setData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };
  if (loading) {
    return (
      <div className="bg-white flex flex-col items-center justify-center h-64 gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
        <p className="text-sm text-black">Loading Gallery...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#D6D6D6] flex  justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Gallery</h2>
          {mode === "table" && (
            <button
              onClick={() => {
                setMode("add");
                setEditingItem(null);
              }}
              className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Plus size={16} /> Add New Image
            </button>
          )}
        </div>

        {/* Content */}
        <div className="">
          {mode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-sm text-black">
                    <th className="border p-3 font-semibold">Id</th>
                    <th className="border p-3 font-semibold">Image</th>
                    <th className="border p-3 font-semibold">Active Status</th>
                    <th className="border p-3 font-semibold">Edit</th>
                    <th className="border p-3 font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 text-sm">
                      <td className="border p-3">{item.id}</td>
                      <td className="border p-3">
                        <img
                          src={item.imageUrl}
                          alt="uploaded"
                          className="w-24 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${
                            item.isActive ? "bg-blue-500" : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                              item.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setMode("edit");
                            console.log(item.id);
                          }}
                          className="hover:text-blue-600"
                        >
                          <FiEdit className="text-black w-5 h-5" size={22} />
                        </button>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="hover:text-red-600"
                        >
                          <FiXSquare className="text-black" size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(mode === "add" || mode === "edit") && (
            <GalleryForm
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

export default ManageGallery;
