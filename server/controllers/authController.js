 import  {comparePassword, hashPassword}  from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

 import JWT from 'jsonwebtoken'
 
 
 const registerController=async(req,res)=>{
  try {
    const {name,email,password,phone,address}=req.body;
    //validations
    if(!name){
        return res.send({message:'Name is Required'})
    }
    if(!email){
        return res.send({message:'Email is Required'})
    }
    if(!password){
        return res.send({message:'Password is Required'})
    }
    if(!phone){
        return res.send({message:'Phone no is Required'})
    }
    if(!address){
        return res.send({message:'Address is Required'})
    }
    //existing user
    const existingUser=await userModel.findOne({email})
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already register please login"
        })
    }
    //register user
    const hashedPassword=await hashPassword(password)
    //save
    const user=await new userModel({name,email,phone,address,password:hashedPassword}).save()
    res.status(201).send({
        success:true,
        message:"User register successfully",
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,message:'Error in Registration',
        error
    })
  }
}


//login\\post
export const loginController=async(req,res)=>{
   try {
    const {email,password}=req.body
    //validation
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Invalid email or password"
        })
    }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid email"
            })
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Password incorrect"
            })

        }
        //token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },token
        })

     
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in login",error
    })
   }
}
export const logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logout Succesfully",
    });
  };
export const testController=(req,res)=>{
    res.send('protedted route')
}
export default registerController