import mongoose from "mongoose";
import { Schema } from "mongoose";

const userScehma=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})
const userModel= mongoose.model.user || mongoose.model("User",userScehma)   
export default userModel