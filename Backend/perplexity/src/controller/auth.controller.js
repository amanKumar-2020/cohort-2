import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/mail.service.js";

export async function registerUser(req, res, next) {
  try {
    const { username, password, email } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const user = await userModel.create({ username, email, password });

    const emailVerificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
    );

   await sendEmail(
      user.email,
      "Email Verification",
      `Please verify your email by clicking the following link: ${process.env.FRONTEND_URL}/api/auth/verify-email?token=${emailVerificationToken}`,
      `<p>Please verify your email by clicking the following link: <a href="${process.env.FRONTEND_URL}/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a></p>`,
    );

    res.status(201).json({
      message: "user register successful ",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        message: "verification token is missing",
        success: false,
        err: "verification token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
        err: "user not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "email already verified",
        success: false,
        err: "email already verified",
      });
    }

    user.verified = true;
    await user.save();

       const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href= "${process.env.FRONTEND_URL}/api/auth/login">Go to Login</a>
    `;
   return res.send(html);

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.status = 400;
      error.message = "verification token has expired";
    } else if (error.name === "JsonWebTokenError") {
      error.status = 400;
      error.message = "invalid verification token";
    } else {
      error.status = 500;
    }
    next(error);
  }
}
