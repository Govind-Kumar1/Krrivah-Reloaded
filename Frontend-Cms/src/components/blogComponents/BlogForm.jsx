import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    short_des: "",
    long_des: "",
    slug_keywords:"",
    slug_url:"",
    thumbnail: null,
    mainImage: null,
    date: new Date().toISOString().substring(0, 10),
  });
  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        category: item.category || "",
        title: item.title || "",
        short_des: item.short_des || "",
        long_des: item.long_des || "",
        slug_keywords:item.slug_keywords||"",
        slug_url:item.slug_url||"",
        date: item.date?.substring(0, 10),
        thumbnail: item.thumbnail || null,
        mainImage: item.mainImage || null,
      });
    }
  }, [item, mode]); 

  const [thumbnailDim, setThumbnailDim] = useState(null);
  const [mainImageDim, setMainImageDim] = useState(null);

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
    }
    else if (formData.thumbnail && formData.thumbnail instanceof File) {
        const objectUrl = URL.createObjectURL(formData.thumbnail);
        getImageDimensions(objectUrl).then(dim => {
          setThumbnailDim(dim);
          URL.revokeObjectURL(objectUrl);
        });
      }
  }, [formData.thumbnail]);

  // Watch main image and get dimensions
  useEffect(() => {
    if (formData.mainImage && typeof formData.mainImage === "string") {
      getImageDimensions(formData.mainImage).then(setMainImageDim);
    }else if (formData.mainImage && formData.mainImage instanceof File) {
        const objectUrl = URL.createObjectURL(formData.mainImage);
        getImageDimensions(objectUrl).then(dim => {
          setMainImageDim(dim);
          URL.revokeObjectURL(objectUrl);
        });
      }
  }, [formData.mainImage]);

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
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Title</label>
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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded bg-white text-black"
            required
          >
            <option value="">Select Category</option>
            <option value="Projects">Projects</option>
            <option value="Design">Design</option>
            <option value="Trends">Trends</option>
            <option value="Sustainability">Sustainability</option>
          </select> 
        </div>

        <div>
          <label className="block font-medium">Publication Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
      </div>
      <div>
        <div>
          <label className="block font-medium">Slug URL</label>
          <input
            type="text"
            name="slug_url"
            value={formData.slug_url} 
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            // required
          />
        </div>
        <div>
          <label className="block font-medium">SEO Keywords</label>
          <input
            type="text"
            name="slug_keywords"
            value={formData.slug_keywords}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            // required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Short Description</label>
        <textarea
          name="short_des"
          value={formData.short_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Context: (Dimension: 850px*1000px)</label>
        <Editor
          apiKey="elkvqlzu7jsm28i60g9j6g95l5nyk18sh7e5d6ioznatbgh1"
          value={formData.long_des}
          onEditorChange={(content) =>
            setFormData({ ...formData, long_des: content })
          }
          init={{
            height: 400,
            plugins: "image link lists code",
            toolbar:
              "undo redo | formatselect | bold italic blockquote | alignleft aligncenter alignright | bullist numlist | image code",
            block_formats:
              "Paragraph=p; Heading 1=h1; Heading 2=h2; Quote=blockquote",
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
          }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Thumbnail: (Dimension: 250px*180px)</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
          {formData.thumbnail && (
            <div className="mt-2">
              <img
              src={typeof formData.thumbnail === "string" ? formData.thumbnail : URL.createObjectURL(formData.thumbnail)}
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
          <label className="block font-medium">Main Image: (Dimension: 1100px*750px)</label>
          <input
            type="file"
            name="mainImage"
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
          {formData.mainImage && (
            <div className="mt-2">
              <img
              src={typeof formData.mainImage === "string" ? formData.mainImage : URL.createObjectURL(formData.mainImage)}
                alt="mainImage"
                className="h-40 w-40 object-cover"
              />
              {mainImageDim && (
                <p className="text-sm text-gray-500 mt-1">
                  {mainImageDim.width} × {mainImageDim.height} px
                </p>
              )}
            </div>
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

export default BlogForm; 
