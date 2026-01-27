import  jwt  from "jsonwebtoken";
const isAuthenticated=(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not Authenticated."
            })
        }
        const decode= jwt.verify(token, process.env.JWT_SECURITY_KEY);
        req.id=decode.userId;
        if(!decode){
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        next();
    }catch(err){
        console.log(err);
    }
}
export default isAuthenticated;