 const jwt=require("jsonwebtoken")

 exports.verifyToken=(req,res,next)=>{
     const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    //  console.log("token is",token);
     
    if(!token){
        return res.status(401).json({error:"Unauthorized, token missing" });
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
    return res.status(401).json({ error: "Unauthorized, token invalid" });
    }
 }

 exports.restrictTo=(...allowedRoles)=>{
    return (req,res,next)=>{
        // console.log("Inside restriict to");
        
        if(!req.user||!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                error:"Forbidden, access denied"
            });
        }
        next();
    };
 }