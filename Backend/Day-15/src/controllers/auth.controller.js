const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController(req,res) {
  const {username , email , bio , password} = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }) 
  if(isUserAlreadyExists){
    return res.status(409).json({
      message:"user already exists" + (isUserAlreadyExists.email===email ? "email already exists" : "username already exists")
    })
  }
  const hash =crypto.createHash("sha256").update(password).digest('hex')
  const user = await userModel.create({
    username,
    password : hash,
    bio,
    email
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {expiresIn :"1d"});
  res.cookie("token",token);
  res.status(201).json({
    message : "user register successful",
    user :{username :user.username,
      email:user.email,
      bio: user.bio
    }
  })
  
}

async function loginController(req,res) {
  const {username , email,password} = req.body;
  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(!user){
    return res.status(404).json({
      message : "user not found"
    })
  }
  const hash = crypto.createHash("sha256").update(password).digest('hex')
  const isPasswordValid = hash==user.password
  if(!isPasswordValid){
    return res.status(401).json({
      message: "password invalid"
    })
  }
  const token = jwt.sign({id :user.user_id} , process.env.JWT_SECRET,{expiresIn :"1d" })
  res.cookie("token", token)
  res.status(200)
  .json({
    message :"user login successful",
    user :{
      username : user.username,
      email:user.email,
      bio :user.bio,
      profileImage : user.profileImage
    }
  })
}

module.exports = {registerController , loginController}