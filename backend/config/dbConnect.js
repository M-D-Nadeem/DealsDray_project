import mongoose from "mongoose";

const dbConnect=async ()=>{
    try{
    const con=await mongoose.connect(process.env.MONGO_URI)
    console.log(con.connection.host);
    
    }catch(err){
        console.log("Error in connecting by database: ",err);
        process.exit(1)
        
    }
}
export default dbConnect