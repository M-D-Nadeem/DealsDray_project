import app from "./app.js";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv"
dotenv.config()
dbConnect()

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
const PORT=process.env.PORT || 4050
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})