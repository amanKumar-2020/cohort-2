const userModel = require("../models/user.model")

async function registerController(req,res) {
  const {username , email , bio , password} = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or:[
      {userModel},
      {email}
    ]
  }) 
  if(isUserAlreadyExists){
    return res.status(409).json({
      message:"user already exists"
    })
  }
  
}