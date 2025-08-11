// src/components/project/ProjectForm.jsx

import React, { useEffect, useState } from "react";

const ProjectForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    short_des: "",
    long_des: "",
    thumbnail: null,
    brochure: null,
    images: [],
    Amenities: {
      villa: "",
      apartment: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        title: item.title || "",
        category: item.category || "",
        date: item.createdAt?.split("T")[0] || "",
        location: item.location || "",
        short_des: item.short_des || "",
        long_des: item.long_des || "",
        Amenities: {
          villa:
            item.Amenities?.find((a) => a.title === "villa")?.listings?.join(
              ", "
            ) || "",
          apartment:
            item.Amenities?.find(
              (a) => a.title === "apartment"
            )?.listings?.join(", ") || "",
        },
        thumbnail: item.thumbnail, // handled separately in submit
        brochure: item.Brochure,
        isActive: item.isActive || false,
        images: item.images,
      });
    }
  }, [item, mode]);

  const [thumbnailDim, setThumbnailDim] = useState(null);
  // Function to get image dimensions
  const getImageDimensions = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () =>
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
    });
  };

  // Watch thumbnail and get dimensions
  useEffect(() => {
    if (formData.thumbnail && typeof formData.thumbnail === "string") {
      getImageDimensions(formData.thumbnail).then(setThumbnailDim);
    } else if (formData.thumbnail && formData.thumbnail instanceof File) {
      const objectUrl = URL.createObjectURL(formData.thumbnail);
      getImageDimensions(objectUrl).then((dim) => {
        setThumbnailDim(dim);
        URL.revokeObjectURL(objectUrl);
      });
    }
  }, [formData.thumbnail]);

  const handleChange = (e) => {
    const { name, value, files, dataset } = e.target;

    if (files) {
      if (name === "images") {
        let img = Array.from(files);
        setFormData((prev) => ({
          ...prev,
          images: [ ...img].slice(0, 10),
        }));
      } else if (name === "thumbnail") {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else if (dataset.type === "amenity") {
      setFormData((prev) => ({
        ...prev,
        Amenities: {
          ...prev.Amenities,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedData = {
      ...formData,
      Amenities: {
        villa: formData.Amenities.villa.split(",").map((a) => a.trim()),
        apartment: formData.Amenities.apartment.split(",").map((a) => a.trim()),
      },
    };

    onSubmit(preparedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="E.g. Residential, Commercial"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Publication Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Short Description</label>
        <input
          type="text"
          name="short_des"
          value={formData.short_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">
          Thumbnail: (Dimension: 450px*600px)
        </label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
        />
        {formData.thumbnail && (
          <div className="mt-2">
            <img
              src={
                typeof formData.thumbnail === "string"
                  ? formData.thumbnail
                  : URL.createObjectURL(formData.thumbnail)
              }
              alt="thumbnail"
              className="h-40 w-40 object-cover"
            />
            {thumbnailDim && (
              <p className="text-sm text-gray-500 mt-1">
                {thumbnailDim.width} × {thumbnailDim.height} px
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">Villa Amenities</label>
        <input
          type="text"
          name="villa"
          data-type="amenity"
          value={formData.Amenities.villa}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Comma separated Villa Amenities"
        />

        <label className="block font-medium mt-3">Apartment Amenities</label>
        <input
          type="text"
          name="apartment"
          data-type="amenity"
          value={formData.Amenities.apartment}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Comma separated Apartment Amenities"
        />
      </div>

      <div>
        <label className="block font-medium">Context</label>
        <textarea
          name="long_des"
          value={formData.long_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          rows={5}
          required
        />
      </div>

      <div className="grid md:grid-cols-1 gap-4">
        <div>
          <label className="block font-medium">
            Upload Images: (Dimension: 650px*550px){" "}
            <span className="ml-1 text-sm text-gray-500">
              (Max 10 images, Size ≤ 10MB)
            </span>
          </label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            multiple
            accept="image/*"
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {formData.images.map((imag, index) => (
                <div key={index} className="col-span-1">
                  <img
                    src={
                      typeof imag === "string"
                        ? imag
                        : URL.createObjectURL(imag)
                    }
                    alt="images"
                    className="h-40 w-40 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium">
            Upload Brochure
            <span className="ml-1 text-sm text-gray-500">(Size ≤ 10MB)</span>
          </label>
          <input
            type="file"
            name="brochure"
            onChange={handleChange}
            accept="application/pdf"
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
          {formData.brochure && (
            <a
              href={formData.brochure}
              target="_blank"
              className="text-blue-700"
            >
              Uploaded brochure
            </a>
          )}
        </div>
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

export default ProjectForm;
