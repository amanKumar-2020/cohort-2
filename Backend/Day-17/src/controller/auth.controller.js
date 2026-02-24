const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
  try {
    const { username, bio, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }
    const emailLower = email.toLowerCase();

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email: emailLower }],
    });
    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "user Already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email: emailLower,
      bio,
      password: hash,
    });

    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
    };

    res.status(201).json({
      message: "user register successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  if ((!email || !username ) && (!password)) {
    return res.status(400).json({
      message: "All fields required",
    });
  }
  let emailLower
  if(email){
    emailLower = email.toLowerCase();
  }

  const user = await userModel
    .findOne({
      $or: [{ username }, { email: emailLower }],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token" , token);
  res.status(200).json({
    message:"user login successful",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    }
  })
}
module.exports = { registerController , loginController};
