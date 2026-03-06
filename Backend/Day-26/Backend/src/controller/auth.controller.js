// const mongoose =require("mongoose")
const userModel = require("../models/user.model")
const jwt =require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
require("dotenv").config()

async function registerController(req,res) {
    const {email , password , username} = req.body;

    if(!email && !username && !password){
        return res.status(400).json({
            message:"All field required"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User Already Exists"
        })
    }
    const hash = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
        username:username,
        email:email,
        password:hash
    })
    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"user register successful",
        user:{
            username:user.username,
            email:user.email
        }
    })
}

async function loginController(req,res) {
    const {email , username ,password} = req.body;

    if ((!email || !username) && !password) {
      return res.status(400).json({
        message: "All field required",
      });
    }
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }
    const isPasswordValid = bcryptjs.compare(user.password == password);
    if(!isPasswordValid){
        return res.status(400).json({
          message: "Invalid credentials",
        });
    }
    const token = jwt.sign(
        {id:user._id , username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )
    res.cookie("token", token)
    res.status(200).json({
        message:"user login successful",
        user:{
            username:user.username,
            email: user.email
        }
    })
}

module.exports = {registerController ,loginController};