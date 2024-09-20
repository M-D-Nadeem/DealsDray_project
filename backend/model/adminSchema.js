import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const adminSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User email is required"],
        unique:[true,"User email must be unique"],
    },
    password:{
        type:String,
        required:[true,"User password is required"],
    },
})

adminSchema.methods={
    jwtToken(){
          return jwt.sign(
            {userName:this.userName},
            process.env.JWT_SECRET_CODE,
            {expiresIn:"24h"}
          )
    }
}
export default mongoose.model("Admin",userSchema)
