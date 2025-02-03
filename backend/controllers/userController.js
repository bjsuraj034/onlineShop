import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import generateUserToken from '../utils/generateUserToken.js'
import jwt from 'jsonwebtoken'
const registerUser=async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        const isExist= await userModel.findOne({email:email})
        if(isExist)
        {
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter the valid email"})
        }
        if( !validator.isLength(password,{min:8}))
        {
            return res.json({success:false,message:"passwrod must be 8 digit long "})
        }
        const salt=await bcrypt.genSalt(10)
        const hasedPassword=await bcrypt.hash(password,salt)
        const   newUser= await new userModel({
            name,
            email,
            password:hasedPassword,

        })
        const user=await newUser.save()

        const token=generateUserToken(user._id)
        res.json({success:true,token,message:"Sucessfully registered"})

        
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}
const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await userModel.findOne({email})
        if(!user)
        {
            return res.json({success:false,message:'Email or password wrong'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch)
        {
            const token=generateUserToken(user._id)
            res.json({success:true,token,user})
        }
        else{
            res.json({success:false,message:'invalid credintails'})
        }
        
        
    } catch (error) {
        console.log(error.message)
        res.json({success:true,message:error.message})
        
    }

}
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate JWT with email in payload
      const token = jwt.sign(
        { email },  // Correct payload structure
        process.env.JWT_SECRET,
        { expiresIn: '9h' }  // Optional expiration
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { adminLogin,loginUser,registerUser };
