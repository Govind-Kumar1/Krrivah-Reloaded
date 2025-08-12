const prisma = require("../prismaClient");
const ApiResponse = require("../utils/apiResponse");
const {cloudinary}=require("../utils/cloudinary")
const {getPublicIdFromUrl}=require("../utils/cloudinaryHelper")

exports.createImage = async (req, res, next) => {
  try {
    const { pageName, component } = req.body;
    if (pageName.toLowerCase() === "design") {
      const designImageCount = await prisma.image.count({
        where: { pageName: "design" },
      });

      if (designImageCount >= 20) {
        return res
          .status(400)
          .json({ error: "Cannot add more than 20 images to the design page" });
      }
    }
    const imageFile = req.file;    

    if (!imageFile) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const image = await prisma.image.create({
      data: {
        pageName,
        component,
        imageUrl: imageFile.path,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Image created successfully", image));
  } catch (error) {
    next(error);
  }
};

exports.updateImage = async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.id);
    const image = await prisma.image.findUnique({ where: { id: imageId } });    

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const { pageName, component, isActive } = req.body;
    const newFile = req.file;    

    const updateData = {};

    if (pageName) updateData.pageName = pageName;
    if (component) updateData.component = component;
    if (isActive !== undefined) updateData.isActive = isActive

    // Handle image replacement
    if (newFile) {
      const oldPublicId = getPublicIdFromUrl(image.imageUrl);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(`Krrivah-Projects/Images/${oldPublicId}`, {
          resource_type: "image",
        });
      }

      updateData.imageUrl = newFile.path;
    }
    
    const updated = await prisma.image.update({
      where: { id: imageId },
      data: updateData,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Image updated successfully", updated));
  } catch (error) {
    next(error);
  }
};

exports.getAllImages = async (req, res, next) => {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "All images fetched successfully", images));
  } catch (error) {
    next(error);
  }
};

exports.getImageById = async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.id);

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Image fetched successfully", image));
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.id);
    const image = await prisma.image.findUnique({ where: { id: imageId } });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    //  Delete from Cloudinary
    const publicId = getPublicIdFromUrl(image.imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(`Krrivah-Projects/Images/${publicId}`, {
        resource_type: "image",
      });
    }

    //  Delete from DB
    await prisma.image.delete({ where: { id: imageId } });

    return res
      .status(200)
      .json(new ApiResponse(200, "Image deleted successfully", image));
  } catch (error) {
    next(error);
  }
};

exports.getImagesByPageName = async (req, res, next) => {
  try {
    const { pageName } = req.params;
    

    const images = await prisma.image.findMany({
      where: { pageName,isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, `Images for page: ${pageName}`, images));
  } catch (error) {
    next(error);
  }
};
