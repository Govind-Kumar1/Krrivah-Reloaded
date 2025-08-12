const prisma=require('../prismaClient');
const ApiResponse = require('../utils/apiResponse');


exports.createAchievementStat = async (req, res, next) => {
  try {
    const { unit, description } = req.body;
    // console.log("inside create achieve");
    
    const count = await prisma.achievementStat.count();
    if (count >= 4) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Maximum of 4 achievement stats allowed"));
    }

    const stat = await prisma.achievementStat.create({
      data: { unit, description },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Achievement stat created", stat));
  } catch (error) {
    next(error);
  }
};



exports.deleteAchievementStat = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const deleted = await prisma.achievementStat.delete({
      where: { id },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Achievement stat deleted", deleted));
  } catch (error) {
    next(error);
  }
};


exports.getAllAchievementStats = async (req, res, next) => {
  try {
    const stats = await prisma.achievementStat.findMany({
      orderBy: { id: "asc" },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "All achievement stats", stats));
  } catch (error) {
    next(error);
  }
};


exports.updateAchievementStat = (async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { unit, description } = req.body;

  if (!unit || !description) {
    return res.status(400).json({ message: "Unit and description are required" });
  }

  const updatedStat = await prisma.achievementStat.update({
    where: { id: parseInt(id) },
    data: {
      unit,
      description,
    },
  });

  res.status(200).json(updatedStat);
});
