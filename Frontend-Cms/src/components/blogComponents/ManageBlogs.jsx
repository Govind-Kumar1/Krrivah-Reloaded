import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { FiEdit, FiXSquare } from "react-icons/fi";
import axios from "axios";
import BlogForm from "./BlogForm.jsx";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageBlogs = () => {
  const [mode, setMode] = useState("table");
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${api_url}/api/blog`,{
          withCredentials: true,
        });
      setData(res.data.data);
      console.log(res.data);
      
    } catch (err) {
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this blog?")) {
      setLoading(true);
      try {
        await axios.delete(`${api_url}/api/blog/${id}`, {
          withCredentials: true,
        });
        fetchBlogs();
      } catch (err) {
        setLoading(false);
        alert("Failed to delete blog.");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const apiFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        apiFormData.append(key, formData[key]);
      });

      if (mode === "add") {
        await axios.post(`${api_url}/api/blog`, apiFormData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (mode === "edit") {
        await axios.put(`${api_url}/api/blog/${editingItem.id}`, apiFormData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchBlogs();
      setMode("table");
      setEditingItem(null);
    } catch (err) {
      setLoading(false);
      alert("Failed to submit blog.");
    }
    setLoading(false);
  };

  const handleToggleStatus = async (item) => {
    setLoading(true);
    try {
      // console.log(item.isActive);
      
      await axios.put(
        `${api_url}/api/blog/${item.id}`,
        { isActive: !item.isActive },
        { withCredentials: true }
      );
      fetchBlogs();
    } catch (err) {
      setLoading(false);
      alert("Failed to update status.");
    }
    setLoading(false);
  };

if (loading) {
  return (
    <div className=  "bg-white flex flex-col items-center justify-center h-64 gap-2">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
      <p className="text-sm text-black">Loading Blogs...</p>
    </div>
  );
}  
if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Blogs</h2>
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
                  <th className="border p-3">Category</th>
                  <th className="border p-3">Thumbnail</th>
                  <th className="border p-3">Published On</th>
                  <th className="border p-3 text-center">Active</th>
                  <th className="border p-3 text-center">Edit</th>
                  <th className="border p-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 text-sm">
                    <td className="border p-3">{item.id}</td>
                    <td className="border p-3">{item.title}</td>
                    <td className="border p-3">{item.category}</td>
                    <td className="border p-3">
                      <img
                        src={item.thumbnail}
                        className="w-16 h-10 object-cover"
                      />
                    </td>
                    <td className="border p-3">
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                          onClick={() => handleToggleStatus(item)}
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
          <BlogForm
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

export default ManageBlogs;
