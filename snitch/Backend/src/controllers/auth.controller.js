import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function sentTokenResponse(user, res, message) {
  const token = jwt.sign(
    { id: User.id }, 
    config.JWT_SECRET_KEY, 
    {expiresIn: "3d",}
)
res.cookie("token",token)
res.status(201).json({
    message:message,
    success:true,
    user
})
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

const loginController = (req, res) => {
  // Handle login logic here
  res.send("Login endpoint");
};

export { registerController, loginController };
