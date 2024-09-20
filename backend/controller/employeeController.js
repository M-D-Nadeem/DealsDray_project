import { error } from "console"
import Employee from "../model/employeeSchema.js"
import { userInfo } from "os"
const addEmployee=async (req,res,next)=>{
    const {name,email,mobile,designation,gender,course}=req.body
    if(!name || !email || !mobile || !designation || !gender || !course){
        return res.status(500).json({error:"All fields are required"})

    }
    try{
    const existEmployee=await Employee.findOne({email})
    if(existEmployee && existEmployee.email===email){
        return res.status(500).json({error:"Employee with this email already exist"})

    }
    const emp=await Employee.create({
        name,email,mobile,designation,gender,course,image:{public_id:"dummy",secure_url:"dummy"}
    })
    if(!emp){
        return res.status(500).json({error:"Failed to create employee"})

    }
    if(req.file){
        try{
        const result=await cloudinary.v2.uploader.upload((req.file.path),{
            folder:'Employee',     
            width:250,        
            height:250,      
            gravity:"face",  
            crop:"fill"      
        })
        if(result){
            emp.image.public_id=result.public_id;
            emp.image.secure_url=result.secure_url
        }
                    
        fs.rm(`uploads/${req.file.filename}`)
    }catch(err){
        return res.status(500).json({error:err})
    }
    }
    await emp.save()
    return res.status(200).json({
        success:true,
        message:"Employee added sucessfully",
        data:emp
    })
    }catch(err){
        return res.status(500).json({success:false,error:err.message})
    }

}

const getAllEmployee=async (req,res,next)=>{
    try{
        const employee=await Employee.find()
        if(!employee){
            return res.status(500).json({error:"Failed to fetch employee's"})
        }
        return res.status(200).json({
            success:true,
            message:"Employee fetched sucessfully",
            data:employee
        })
    }catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}

const updateEmployee=async (req,res,next)=>{
    const {name,email,mobile,designation,gender,course}=req.body
    if(!name || !email || !mobile || !designation || !gender || !course){
        return res.status(500).json({error:"All fields are required"})
    }
    const empId=req.params.empId
    const emp=await Employee.findById({empId})
    try{
        emp.name=name
        emp.email=email
        emp.mobile=mobile
        emp.designation=designation
        emp.gender=gender
        emp.course=course
        await emp.save()
        if(req.file){
            await cloudinary.v2.uploader.destroy(emp.image.public_id)
            try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"Employee",
                width:250,
                height:250,
                gravity:"face", 
                crop:"fill"
            })
        if(result){
            emp.image.public_id=result.public_id;
            emp.image.secure_url=result.secure_url
        }
        fs.rm(`uploads/${req.file.filename}`)
    }
    catch(err){
        return res.status(500).json({error:err})
    }
}
      await emp.save()
      const data=await Employee.findById(empId)
      return res.status(200).json({
      sucess:true,
      message:"Employee update sucessfull",
      data:data
    })
    }catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}

const deleteEmployee=async (req,res,next)=>{
    const empId=req.params.empId
    if(!empId){
        return res.status(500).json({error:"Can not fetch employee id"})

    }
    try{
         const emp=await Employee.findById(empId)
         if(!emp){
            return res.status(500).json({error:"Failed to fetch employee"})
        }
         await Employee.findByIdAndDelete(empId)
         return res.status(200).json({
            sucess:true,
            message:"Employee deleted sucessfully"
         })
    }
    catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}
