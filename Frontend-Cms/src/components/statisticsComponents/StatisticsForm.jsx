import React, { useState, useEffect } from "react";

const StatisticsForm = ({ mode, item, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    unit: "",
    description: "",
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setForm({
        unit: item.unit || "",
        description: item.description || "",
      });
    } else {
      setForm({ unit: "", description: "" });
    }
  }, [mode, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        
        <label htmlFor="unit" className="text-right font-medium">
          Number
        </label>
        <input
          type="text"
          id="unit"
          name="unit"
          className="col-span-2 border rounded px-3 py-2 w-full"
          value={form.unit}
          onChange={handleChange}
        />

        <label htmlFor="description" className="text-right font-medium">
          One Liner Text
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="col-span-2 border rounded px-3 py-2 w-full"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <hr />

      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-white border rounded hover:bg-gray-100"
          onClick={onCancel}
        >
          Close Form
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#383D34] text-white rounded hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StatisticsForm;
