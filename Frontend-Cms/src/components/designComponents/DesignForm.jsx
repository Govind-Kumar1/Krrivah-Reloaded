import React, { useState, useEffect } from "react";

const DesignForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    pageName: "design",
    image: "",
    component: ""
  });

  const [imageDim, setImageDim] = useState(null);

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        pageName: item.pageName || "design",
        image: item.imageUrl,
        component: item.component
      });
    }
  }, [mode, item]);

  // Function to get dimensions
  const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
    });
  };

  // Watch image & update dimensions
  useEffect(() => {
    if (formData.image && typeof formData.image === "string") {
      getImageDimensions(formData.image).then(setImageDim);
    } else if (formData.image && formData.image instanceof File) {
      const objectUrl = URL.createObjectURL(formData.image);
      getImageDimensions(objectUrl).then(dim => {
        setImageDim(dim);
        URL.revokeObjectURL(objectUrl);
      });
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
        />
        {formData.image && (
          <div className="mt-2 flex flex-col items-center">
            <img
              src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
              alt="Preview"
              
              className="h-[200px] w-[200px] object-cover"
            />
            {imageDim && (
              <p className="text-sm text-gray-500 mt-1">
                {imageDim.width} × {imageDim.height} px
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Component</label>
        <input
          type="text"
          name="component"
          value={formData.component}
          // onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-white text-black"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Close Form 
        </button>
        <button
          type="submit"
          className="bg-[#383D34] text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DesignForm;
