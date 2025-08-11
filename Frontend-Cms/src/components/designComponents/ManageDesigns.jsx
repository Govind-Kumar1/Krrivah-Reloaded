import React, { useEffect, useState } from "react";
import { FiEdit,FiXSquare } from "react-icons/fi";
import DesignForm from "./DesignForm";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";


const staticBentos = [
  { id: "1", dimension:"275px*150px", component: "bento1", imageUrl: "", pageName: "design" },
  { id: "2", dimension:"180px*150px", component: "bento2", imageUrl: "", pageName: "design" },
  { id: "3", dimension:"375px*325px", component: "bento3", imageUrl: "", pageName: "design" },
  { id: "4", dimension:"195px*155px", component: "bento4", imageUrl: "", pageName: "design" },
  { id: "5", dimension:"180px*155px", component: "bento5", imageUrl: "", pageName: "design" },
  { id: "6", dimension:"275px*240px", component: "bento6", imageUrl: "", pageName: "design" },
  { id: "7", dimension:"195px*150px", component: "bento7", imageUrl: "", pageName: "design" },
  { id: "8", dimension:"180px*240px", component: "bento8", imageUrl: "", pageName: "design" },
  { id: "9", dimension:"275px*155px", component: "bento9", imageUrl: "", pageName: "design" },
  { id: "10", dimension:"275px*240px", component: "bento10", imageUrl: "", pageName: "design" },
  { id: "11", dimension:"290px*240px", component: "bento11", imageUrl: "", pageName: "design" },
];

const ManageDesigns = () => {
  const [mode, setMode] = useState("table");
  const [data, setData] = useState(staticBentos);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api_url}/api/image/getByPage/design`, {
        withCredentials: true,
      });

      const fetched = res.data.data || [];
      console.log(fetched);
      

      // Merge static list with fetched data
      const merged = staticBentos.map(bento => {
        const match = fetched.find(f => f.component === bento.component);
        return match ? { ...bento, ...match } : bento;
      });

      setData(merged);
    } catch (error) {
      console.error("Failed to fetch designs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pageName", form.pageName);
      formData.append("component", form.component);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingItem?.id && editingItem.imageUrl) {
        // Existing record → update
        await axios.put(`${api_url}/api/image/${editingItem.id}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // New record → create
        await axios.post(`${api_url}/api/image`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchData();
      setMode("table");
      setEditingItem(null);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white flex flex-col items-center justify-center h-64 gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
        <p className="text-sm text-black">Loading Designs...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Designs</h2>
        </div>

        {mode === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-sm text-black">
                  <th className="border p-3 font-semibold">Dimension</th>
                  <th className="border p-3 font-semibold">Component</th>
                  <th className="border p-3 font-semibold">Image</th>
                  <th className="border p-3 font-semibold">Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.component} className="hover:bg-gray-50 text-sm">
                    <td className="border p-3">{item.dimension}</td>
                    <td className="border p-3">{item.component}</td>
                    <td className="border p-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.component}
                          className="w-24 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setMode("edit");
                        }}
                        className="hover:text-blue-600"
                      >
                        <FiEdit className="text-black w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(mode === "edit") && (
          <DesignForm
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

export default ManageDesigns;
