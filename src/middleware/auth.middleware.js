import { User } from "../models/User.models.js";
import ApiError from "../utilis/ApiError.js";
import asyncHandler from "../utilis/asyncHandler.js";
import { jwt } from "jsonwebtoken";



export const verifyJWT = asyncHandler(async(req, res, next) => {

  try {
    const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "")
  
    if (!token) {
      throw new ApiError(401, "Unauthorized Request")
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log("decode token: ",decodedToken);
    
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if (!user) {
      throw new ApiError(401, "Invalid Access Token")
    }
  
    req.user = user
    next();

  } catch (error) {

    throw new ApiError(401, error?.message || "Invalid Access Token")    

  }

} )