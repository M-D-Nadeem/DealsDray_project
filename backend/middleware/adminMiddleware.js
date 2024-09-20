import { error } from "console"
import jwt from "jsonwebtoken"
const jwtAuth=async (req,res,next)=>{
    const token=(req.cookies.token) || null
    if(!token){
        return res.status(500).json({
            success:false,
            message:"Token does not exist"
        })
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET_CODE)
        req.user=payload
    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
    next()
}

export default jwtAuth