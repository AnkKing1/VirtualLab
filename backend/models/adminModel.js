import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

},{timestamps:true})


const Admin = mongoose.model('Admin', adminSchema);

export default Admin;