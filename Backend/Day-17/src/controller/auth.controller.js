const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");




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
         $or: [{ username }, { email:emailLower }],
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
module.exports = { registerController };
