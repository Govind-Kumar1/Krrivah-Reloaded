const prisma = require("../prismaClient");

// Create a new hero brand with Cloudinary image
const createHeroBrand = async (req, res) => {
  try {
    const { title, description, brand } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // You might want to validate the brand field as well
    if (!brand) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const imageUrl = image.path;

    const newBrand = await prisma.heroBrand.create({
      data: {
        title,
        imageUrl,
        description,
        brand, // Now this 'brand' correctly comes from req.body
      },
    });

    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: "Error creating hero brand", error });
  }
};

// Get all hero brands (This function was already correct)
const getAllHeroBrands = async (req, res) => {
  try {
    const brands = await prisma.heroBrand.findMany();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero brands", error });
  }
};

// Update a hero brand (optionally including image)
const updateHeroBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, brand } = req.body;
    const image = req.file;

    const updateData = {
      title,
      description,
      brand, // Now this 'brand' is correctly defined.
    };

    if (image) {
      updateData.imageUrl = image.path;
    }

    const updated = await prisma.heroBrand.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating hero brand", error });
  }
};

// Delete a hero brand (This function was already correct)
const deleteHeroBrand = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // correct usage

    await prisma.heroBrand.delete({
      where: { id },
    });

    res.status(200).json({ message: "Hero brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hero brand", error });
  }
};

module.exports = {
  createHeroBrand,
  getAllHeroBrands,
  updateHeroBrand,
  deleteHeroBrand,
};
