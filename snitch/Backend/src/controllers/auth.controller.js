import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function sentTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  res.status(201).json({
    message: message,
    success: true,
    user,
  });
}

const registerController = async (req, res) => {
  const { fullName, email, password, contact, isSeller } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      fullName,
      email,
      password,
      contact,
      role: isSeller ? "seller" : "buyer",
    });
    await newUser.save();
    // return res.status(201).json({ message: "User registered successfully"
    // })
    await sentTokenResponse(newUser, res, "User registered successfully");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, contact, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { contact }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await sentTokenResponse(user, res, "Login successful");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const googleCallback = async (req, res) => {
  const { id, displayName, emails } = req.user;
  const email = emails[0].value;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      fullName: displayName,
      email,
      googleId: id,
    });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  res.redirect(`${config.FRONTEND_URL}`);
};

const getMe = async (req,res)=> {
  const user= req.user;
  if(!user){
    return res.status(401).json({
      message:"user not found",
      success: false
    })
  }
  res.status(201).json({
    message:"user fetched successful",
    success:true,
    user
  })
}

export { registerController, loginController, googleCallback, getMe };
