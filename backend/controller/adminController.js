import { error } from "console";
import Admin from "../model/adminSchema.js"
const signUp=async (req,res)=>{
    const {userName,password}=req.body;
    if(!userName || !password){
        return res.status(500).json({error:"Both userName and password is required"})
    }
    try{
    const existUser=await Admin.findOne({userName})
    if(existUser && existUser.userName===userName){
        return res.status(500).json({error:"User with this userName already exist"})

    }
    const user=await Admin.create({userName,password})
    if(!user){
           return res.status(500).json({error:"Failed to add admin details"})
    }
    const token=await user.jwtToken()
    res.cookies("token",token,{
        maxAge:24 * 60 * 60 * 1000 ,
        httpOnly:true,
        secure:true,
    })
    return res.status(200).json({
        success:true,
        message:"Signup Sucessful",
        data:user
    })
    }catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}

const login=async (req,res)=>{
    const {userName,password}=req.body;
    if(!userName || !password){
        return res.status(500).json({error:"Both userName and password is required"})
    }
    try{
    const user=await Admin.findOne({userName})
    
    if(!user && user.userName!==userName){
           return res.status(500).json({error:"No user with such user name exist"})
    }
    if(user.password!==password){
        return res.status(500).json({error:"Password is incorrect"})
    }
    const token=await user.jwtToken()
    res.cookies("token",token,{
        maxAge:24 * 60 * 60 * 1000 ,
        httpOnly:true,
        secure:true,
    })
    return res.status(200).json({
        success:true,
        message:"Login Sucessful",
        data:user
    })
    }catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}

export {signUp,login}