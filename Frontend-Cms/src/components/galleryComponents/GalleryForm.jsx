import React, { useState, useEffect } from "react";

const GalleryForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    pageName:"home",
    component:"crafted-purpose",
    image: null,
  }); 

  const [imageDim, setImageDim] = useState(null);
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

  useEffect(() => {
  if (mode === "edit" && item) {
    setFormData({
      pageName: item.pageName || "home",
      component: item.component || "crafted-purpose",
      image: item.imageUrl, // don't prefill file input
    });
  }
}, [mode, item]);

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
        <label className="block font-medium">Image: (Dimension: 521px*511px)</label>
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
      </div>
    </form>
  );
};

export default GalleryForm;
