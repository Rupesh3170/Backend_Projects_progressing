import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser=asyncHandler(async(req,res)=>{

    //get user details from frontend
    //validation 
    //check if user already exist
    //check for images,check for avatar
    //upload them to cloudinary,check for avatar avatar upload or not on cloudinary
    //create user object --create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res



    const {fullName,email,username,password}=req.body
    console.log("email: ",email);

    // if(fullName===""){
    //     throw new ApiError(400,"fullname is required")
    // }//unprofessional method and we have to write these type for all like email,password etc 

    //professional method:->

    if(
        [fullName,email,username,password].some((field)=>field?.trim==="")

    )
    {
        throw new ApiError(400,"All fields is required")

    }


    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username exist")

    }

   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath=registerUser.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }


   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){ //checking ki avatar gya ki nhi

    throw new ApiError(400,"Avatar file is required")
   }




   



})



export {registerUser}