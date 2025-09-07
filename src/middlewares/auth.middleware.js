//this middleware verifies ki user hai ki nhi hai 

import { asyncHandler } from "../utils/asyncHandler";



export const verifyJWT=asyncHandler(async(req,res,next)=>{
    req.cookies?.accesToken ||req.header("Authorization")
})