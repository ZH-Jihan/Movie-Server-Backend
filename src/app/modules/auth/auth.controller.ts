import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { AuthServices } from "./auth.service";


const registerUser = asyncHandler(async (req,res)=>{
    const result = await AuthServices.registerUser(req.body)

    ApiResponse(res,{
        statusCode: StatusCodes.CREATED,
        message: "User Register successfully",
        data: result
    })
})

const loginUser = asyncHandler(async (req,res)=>{
    const result = await AuthServices.logInUser(req.body)

    ApiResponse(res,{
        statusCode: StatusCodes.OK,
        message: "User Login successfully",
        data: result
    })
})

export{
    registerUser,
    loginUser
}