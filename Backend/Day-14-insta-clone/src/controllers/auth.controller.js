const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, password, bio, email } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "user already exist" +
        (isUserAlreadyExists.email == email
          ? "email already exist"
          : "username already exist"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    bio,
    password: hash,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token",token)
  res.status(201).json({
    message: "User Registered successfully",
    user:{
      username :user.username,
      email : user.email,
      bio : user.bio,
    }
  });
}

async function loginController(req,res) {
  const {username , password , email} = req.body;
  const user = await userModel.findOne({
    $or:[
      {username},
    {email}
    ]
  })
 if(!user){
  return res.status(404).json({
    message: "user not found",
  });
 }
 const hash = crypto.createHash("sha256").update(password).digest("hex");
 const isPasswordValid = hash == user.password
 if(!isPasswordValid){
  return res.status(401).json({
    message : "password invalid"
  })
 }
 const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
 res.cookie("token", token);
 res.status(200)
 .json({
  message : 'user login successful',
  user:{
    username : user.username,
    bio : user.bio,
    email : user.email,
    profileImage : user.profileImage
  }
 })
}
module.exports = {
  registerController,
  loginController
};
