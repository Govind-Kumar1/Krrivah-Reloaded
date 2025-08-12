const prisma = require("../prismaClient");
const ApiResponse = require("../utils/apiResponse");
const { cloudinary } = require("../utils/cloudinary");
const { getPublicIdFromUrl } = require("../utils/cloudinaryHelper");

// CREATE BLOG
exports.createBlog = async (req, res, next) => {
  try {
    const {
      category,
      title,
      short_des,
      long_des,
      slug_keywords,
      slug_url
    } = req.body;

    // Cloudinary file URLs
    const thumbnail = req.files['thumbnail']?.[0]?.path;
    const mainImage = req.files['mainImage']?.[0]?.path;

    if (!category || !thumbnail || !mainImage || !title || !short_des || !long_des ) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const blog = await prisma.blog.create({
      data: {
        category,
        thumbnail,
        mainImage,
        title,
        short_des,
        long_des,
        slug_keywords,
        slug_url
      },
    });

    return res.status(201).json(new ApiResponse(201, "Blog created successfully", blog));
  } catch (error) {
    next(error);
  }
};

// GET ALL BLOGS
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        date: 'desc',
      }
    });
    return res.status(200).json(new ApiResponse(200, "Blogs fetched successfully", blogs));
  } catch (error) {
    next(error);
  }
};

// DELETE BLOG 
exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = parseInt(req.params.id);

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete images from Cloudinary
    const imagesToDelete = [blog.thumbnail, blog.mainImage, blog.middleImage];

    for (const imageUrl of imagesToDelete) {
      const publicId = getPublicIdFromUrl(imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(`Krrivah/Images/${publicId}`, {
          resource_type: "image",
        });
      }
    }

    // Delete blog from DB
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog deleted successfully", blog));
  } catch (error) {
    next(error);
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res, next) => {
  try {
    const blogId = parseInt(req.params.id);
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const {
      category,
      title,
      short_des,
      long_des,
      quote,
      isActive,
      slug_keywords,
      slug_url
    } = req.body;

    const files = req.files;

    // Handle image replacement logic
    const imageFields = ["thumbnail", "mainImage"];
    const updatedImages = {};

    for (const field of imageFields) {
      if (files && files[field] && files[field][0]) {
        // New image uploaded
        const newUrl = files[field][0].path;

        // Delete old image from Cloudinary
        const oldUrl = blog[field];
        const publicId = getPublicIdFromUrl(oldUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(`Krrivah/Images/${publicId}`, {
            resource_type: "image",
          });
        }

        updatedImages[field] = newUrl;
      } else {
        // No new image, keep old
        updatedImages[field] = blog[field];
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        category,
        title,
        short_des,
        long_des,
        quote,
        isActive,
        slug_keywords,
        slug_url,
        ...updatedImages,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
  } catch (error) {
    next(error);
  }
};
