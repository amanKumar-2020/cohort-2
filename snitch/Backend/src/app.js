import express from "express";
import connectToDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser"
// const jwt = require("jsonwebtoken");
import config from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: " http://localhost:5174/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    withCredentials: true,
  }),
);

// Passport Google OAuth Strategy
app.use(passport.initialize());
passport.use( new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5173/api/auth/google/callback",
},
(accessToken, refreshToken, profile, done) => {
  // Here you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}))

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to Database
connectToDB();
app.use(morgan("dev"));
export default app;