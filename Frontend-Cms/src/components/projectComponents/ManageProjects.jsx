// src/components/project/ManageProjects.jsx

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { FiEdit, FiXSquare } from "react-icons/fi";
import axios from "axios";
import ProjectForm from "./ProjectForm";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageProjects = () => {
  const [mode, setMode] = useState("table");
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${api_url}/api/project`, {
        withCredentials: true,
      });
      setData(res.data.data);
    } catch (err) {
      alert("Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this project?")) {
      setLoading(true);
      try {
        await axios.delete(`${api_url}/api/project/${id}`, {
          withCredentials: true,
        });
        fetchProjects();
      } catch (err) {
        alert("Failed to delete project.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const fd = new FormData();

      // Append fields properly
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "Amenities") {
          fd.append("amenities", JSON.stringify(value));
        } else if (key === "images" && Array.isArray(value)) {
          value.forEach((img) => {
            if (img instanceof File) {
              fd.append("images", img);
            }
          });
        } else if ((key === "thumbnail" || key === "brochure") && value) {
          if (value instanceof File) {
            fd.set(key, value); // overwrite if reselected
          }
        } else if (
          value !== null &&
          value !== undefined &&
          typeof value !== "object"
        ) {
          fd.set(key, value);
        }
      });

      if (mode === "add") {
        await axios.post(`${api_url}/api/project`, fd, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (mode === "edit") {
        await axios.put(`${api_url}/api/project/${editingItem.id}`, fd, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProjects();
      setMode("table");
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit project.");
    } finally {
      setLoading(false);
    }
  };

  const toggleActiveStatus = async (item) => {
    setLoading(true);
    try {
      await axios.put(
        `${api_url}/api/project/${item.id}`,
        { isActive: !item.isActive },
        { withCredentials: true }
      );
      fetchProjects();
    } catch (err) {
      alert("Failed to toggle status.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white flex flex-col items-center justify-center h-64 gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
        <p className="text-sm text-black">Loading Projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Projects</h2>
          {mode === "table" && (
            <button
              onClick={() => setMode("add")}
              className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200"
            >
              <Plus size={16} /> Add New Record
            </button>
          )}
        </div>

        {mode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-sm text-black">
                  <th className="border p-3">Id</th>
                  <th className="border p-3">Title</th>
                  <th className="border p-3">Content</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Publication Date</th>
                  <th className="border p-3 text-center">Active Status</th>
                  <th className="border p-3 text-center">Edit</th>
                  <th className="border p-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 text-sm">
                    <td className="border p-3">{item.id}</td>
                    <td className="border p-3">{item.title}</td>
                    <td className="border p-3">{item.short_des}</td>
                    <td className="border p-3">
                      <img
                        src={item.thumbnail}
                        className="w-16 h-10 object-cover"
                      />
                    </td>
                    <td className="border p-3">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => toggleActiveStatus(item)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${
                          item.isActive ? "bg-blue-600" : "bg-gray-400"
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
                      <FiEdit
                        onClick={() => {
                          setEditingItem(item);
                          setMode("edit");
                        }}
                        className="text-black cursor-pointer"
                        size={20}
                      />
                    </td>
                    <td className="border p-3 text-center">
                      <FiXSquare
                        onClick={() => handleDelete(item.id)}
                        className="text-black cursor-pointer"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ProjectForm
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
  );
};

export default ManageProjects;
