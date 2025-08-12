const ApiResponse = require("../utils/apiResponse");
const prisma = require("../prismaClient");


exports.getDashboardData=async(req,res,next)=>{
    try {
        
        const totalContacts = await prisma.contact.count();
        const totalProjects = await prisma.project.count();
        const totalBlogs = await prisma.blog.count();
        
        const dashboardData = {
            totalContacts,
            totalProjects,
            totalBlogs
        };        

        return res.status(200).json(new ApiResponse(200, "Dashboard data fetched successfully", dashboardData));
    } catch (error) {
        next(error);
    }
} 