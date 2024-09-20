const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Employee name is required"],
  },
  email: {
    type:String,
    required:[true,"Employee email is required"],
    unique:[true,"Employee email must be unique"],
    trim:true,
    lowercase:true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ],
  },
  mobile: {
    type:Number,
    required:true,
  },
  designation: { type: String,required:true, enum: ['hr', 'manager', 'sales'] },
  gender: { type: String,required:true, enum: ['M', 'F'] },
  course: { type: String,required:true, enum: ['MCA', 'BCA', 'BSc'] },
  image: {
    public_id:{type:String},
    secure_url:{type:String}
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Employee', employeeSchema);
