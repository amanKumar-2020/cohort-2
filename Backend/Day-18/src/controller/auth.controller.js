const express = require("express");
const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const { username, password, email, bio } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }
    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "user Already Exists",
      });
    }
    const hash = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      bio,
      password: hash,
    });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "user created successful",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server Error",
    });
  }
}

async function loginControler(req, res) {
 try {
   const { username, email, password } = req.body;

   if ((!email || !username) && !password) {
     return res.status(400).json({
       message: "All field required",
     });
   }
   const user = await userModel
     .findOne({
       $or: [{ username: username }, { email: email }],
     })
     .select("+password");

   if (!user) {
     return res.status(400).json({
       message: "Invalid credentials",
     });
   }
   const isPasswordValid = await bcryptjs.compare(password, user.password);
   if (!isPasswordValid) {
     return res.status(401).json({
       message: "Invalid password",
     });
   }
   const token = jwt.sign(
     { id: user._id, username: user.username },
     process.env.JWT_SECRET,
     { expiresIn: "3d" },
   );
   res.cookie("token", token);
   res.status(200).json({
     message: "user login successful",
     user: {
       username: user.username,
       email: user.email,
       bio: user.bio,
       profileImage: user.profileImage,
     },
   }); 
 } catch (error) {
  console.log(error);
  return res.status(500).json({
    message :"server error"
  })
 }
}

module.exports = { registerController ,loginControler };
