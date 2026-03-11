import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";

export async function registerUser(req,res) {
    const {username , password , email} = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        res.status(400).json({
            message: "user with this username or email already Exists",
            success : false,
            err : "user Already Exists"
        })
    }
    const user = await userModel.create({username,email , password})

    /**
     * Here we need to apply mail send features
     */

    res.status(201).json({
        message: "user register successful ",
        success : true,
        user:{
            id: user._id,
            username: user.username,
            email :user.email
        }
    })
}