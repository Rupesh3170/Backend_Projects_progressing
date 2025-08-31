import mongoose ,{Schema} from "mongoose";

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
         email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
         fullname:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            index:true
        },
         avatar:{
            type:String,//cloudinary url we used -->similar to aws type service where we can upload image file and videos and it provides the link freely available 
            required:true,
        },
         coverImage:{
            type:String,// cloudnary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"

            }
        ],
        password:{
            type:String,
            required:[true,'password is required']
        },
        refreshToken:{
            type:String
        }

},

{
    timestamps:true
}
)

//for password encrypt we use pre middelware or hooks
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)  //time lageega  since password jab encrypt oga toh time lagega therefor use await
    next()

})

//for validating password  

userSchema.methods.isPasswordCorrect=async function(password){


    return await bcrypt.compare(password,this.password)
}



//generating token
userSchema.methods.generateAccessToken= function(){

    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname

        },
        process.env.ACCES_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


//generating refresh token
userSchema.methods.generateRefreshToken= function(){

    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}






export const User=mongoose.model("User",userSchema)

