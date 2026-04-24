import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";

export const authMiddlewareUser = async (req, res, next) => {
  const token = req.cookies.token ;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authMiddlewareSeller = async (req, res, next) => {
  const token = req.cookies.token ;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "seller") {
      return res.status(403).json({ message: "Access denied: Not a seller" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

