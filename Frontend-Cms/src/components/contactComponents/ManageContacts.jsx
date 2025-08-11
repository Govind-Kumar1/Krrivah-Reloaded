import React, { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ManageContacts() {
  // Abhi ke liye sample data use kar rahe hain
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(false);

  // API se data fetch karne ka example

  const loadContacts = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${api_url}/api/contact`, {
        withCredentials: true,
      });
      setContacts(res.data.data || []);
      // console.log(res.data);
    } catch (error) {
      setLoading(false);
      alert("Failed to fetch contacts");
    }
    setLoading(false)
  };

  useEffect(() => {
    loadContacts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white flex flex-col items-center justify-center h-64 gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-100"></div>
        <p className="text-sm text-black">Loading Contacts...</p>
      </div>
    );
  }

  return (
    <div className="p-1">
      {/* Header */}
      <div className="bg-[#393F36] text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-medium">Manage Contacts</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-t-0 rounded-b-lg">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="text-left text-black">
                <th className="border p-3 font-semibold">Id</th>
                <th className="border p-3 font-semibold">Time Stamp</th>
                <th className="border p-3 font-semibold">First Name</th>
                <th className="border p-3 font-semibold">Last Name</th>
                <th className="border p-3 font-semibold">Email</th>
                <th className="border p-3 font-semibold">Phone Number</th>
                <th className="border p-3 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="border p-3 text-gray-600">{contact.id}</td>
                  <td className="border p-3 text-gray-700">
                    {" "}
                    {new Date(contact.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="border p-3 font-medium">
                    {contact.firstName}
                  </td>
                  <td className="border p-3 font-medium">{contact.lastName}</td>
                  <td className="border p-3 text-blue-600 hover:underline">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td className="border p-3">{contact.phone}</td>
                  <td
                    className="border p-3 text-gray-700 max-w-xs truncate"
                    title={contact.message}
                  >
                    {contact.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
