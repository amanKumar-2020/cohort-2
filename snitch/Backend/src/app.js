import express from "express";
import connectToDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

// Connect to Database
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;