const prisma = require("../prismaClient");
const ApiResponse = require("../utils/apiResponse");
const { cloudinary } = require("../utils/cloudinary");
const { getPublicIdFromUrl } = require("../utils/cloudinaryHelper");

exports.createProject = async (req, res, next) => {
  try {
    const {
      category,
      title,
      location,
      short_des,
      long_des,
      amenities, // array of { title: listings[] }
    } = req.body;

    const brochureFile = req.files?.brochure?.[0];
    const imageFiles = req.files?.images || [];
    const thumbnailFiles = req.files?.thumbnail || [];

    if (!brochureFile) {
      return res.status(400).json({ error: "Brochure PDF is required" });
    }
    if (!thumbnailFiles) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }

    if (imageFiles.length > 10) {
      return res.status(400).json({ error: "Max 10 images allowed" });
    }

    const imageUrls = imageFiles.map((file) => file.path);
    const brochureUrl = brochureFile.path;
    const thumbnailUrl = thumbnailFiles[0].path;

    // Parse amenities
    let amenitiesData = [];
    if (amenities) {
      const parsed =
        typeof amenities === "string" ? JSON.parse(amenities) : amenities;
      amenitiesData = Object.entries(parsed).map(([key, value]) => ({
        title: key,
        listings: Array.isArray(value) ? value : [],
      }));
    }

    const createdProject = await prisma.project.create({
      data: {
        category,
        title,
        location,
        short_des,
        long_des,
        thumbnail: thumbnailUrl, // default first image
        images: imageUrls,
        Brochure: brochureUrl,
        Amenities: {
          create: amenitiesData,
        },
      },
      include: {
        Amenities: true,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Project created", createdProject));
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const existing = await prisma.project.findUnique({
      where: { id: projectId },
      include: { Amenities: true },
    });

    if (!existing) {
      return res.status(404).json({ error: "Project not found" });
    }

    const files = req.files;
    const {
      createdAt,
      category,
      title,
      location,
      short_des,
      long_des,
      isActive,
      amenities, // stringified JSON or object
    } = req.body;

    const updateData = {};
    
    if (category) updateData.category = category;
    if (createdAt) updateData.createdAt = createdAt;
    if (title) updateData.title = title;
    if (location) updateData.location = location;
    if (short_des) updateData.short_des = short_des;
    if (long_des) updateData.long_des = long_des;
    if (isActive||!isActive) updateData.isActive = isActive;
    if (typeof updateData.isActive === "string") {
      updateData.isActive = updateData.isActive.toLowerCase() === "true";
    }

    // --- Brochure update ---
    if (files?.brochure?.[0]) {
      const oldId = getPublicIdFromUrl(existing.Brochure);
      if (oldId) {
        await cloudinary.uploader.destroy(oldId, { resource_type: "raw" });
      }
      updateData.Brochure = files.brochure[0].path;
    }

    // console.log("Brouchure updated");

    // --- Images update ---
    if(files?.thumbnail?.[0]) {
      const publicId = getPublicIdFromUrl(existing.thumbnail); 
      if(publicId){
        await cloudinary.uploader.destroy(publicId,{resource_type:"image"});
      }
      updateData.thumbnail = files?.thumbnail?.[0].path;
    }

    if (files?.images?.length > 0) {
      for (const img of existing.images) {
        const publicId = getPublicIdFromUrl(img);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });
        }
      }
      const newImages = files.images.map((f) => f.path);
      updateData.images = newImages;
    }

    // console.log("Image updated");
    // Use a transaction for updating project + amenities together
    const updatedProject = await prisma.$transaction(async (tx) => {
      // Update project main details
      // console.log("Transaction begin");
      // console.log(updateData);

      const proj = await prisma.project.update({
        where: { id: projectId },
        data: updateData,
      });

      // Update amenities only if provided
      if (amenities) {
        const parsed =
          typeof amenities === "string" ? JSON.parse(amenities) : amenities;

        const amenitiesArray = Object.entries(parsed).map(([key, value]) => ({
          projectId,
          title: key,
          listings: Array.isArray(value) ? value : [],
        }));

        // Delete old amenities
        await prisma.amenitiy.deleteMany({ where: { projectId } });

        // Create new amenities
        if (amenitiesArray.length > 0) {
          await prisma.amenitiy.createMany({
            data: amenitiesArray,
          });
        }
      }
      // console.log("Amenities done ");

      // Return updated project with fresh amenities
      return prisma.project.findUnique({
        where: { id: projectId },
        include: { Amenities: true },
      });
    });
    // console.log("Project updated");

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Project updated successfully", updatedProject)
      );
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { Amenities: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    //  Delete brochure from Cloudinary
    if (project.Brochure) {
      const publicId = getPublicIdFromUrl(project.Brochure);
      if (publicId) {
        await cloudinary.uploader.destroy(`Krrivah/Brochures/${publicId}`, {
          resource_type: "raw",
        });
      }
    }

    //  Delete images from Cloudinary
    for (const imgUrl of project.images) {
      const publicId = getPublicIdFromUrl(imgUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(`Krrivah/Images/${publicId}`, {
          resource_type: "image",
        });
      }
    }

    //  Delete amenities
    await prisma.amenitiy.deleteMany({ where: { projectId } });

    //  Delete the project
    await prisma.project.delete({ where: { id: projectId } });

    return res
      .status(200)
      .json(new ApiResponse(200, "Project deleted successfully", project));
  } catch (error) {
    next(error);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Amenities: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Projects fetched successfully", projects));
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        Amenities: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Project fetched successfully", project));
  } catch (error) {
    next(error);
  }
};
