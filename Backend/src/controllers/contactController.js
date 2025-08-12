const prisma = require("../prismaClient");
const ApiResponse = require("../utils/apiResponse");

exports.createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;
    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const contact=await prisma.contact.create({
        data:{firstName,lastName,phone,email,message},
    })
    return res.status(201).json(new ApiResponse(201,"Contact submitted successfully",contact));
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts=async(req,res,next)=>{
    try {
        const contacts=await prisma.contact.findMany({
            orderBy:{createdAt:"desc"}
        })
        return res.status(200)      .json(new ApiResponse(200, "Contacts fetched successfully", contacts));
    } catch (error) {
        next(error);
    }
}
