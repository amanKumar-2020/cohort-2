import express from "express";
import connectToDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: " http://localhost:5174/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    withCredentials: true,
  }),
);
app.use("/api/auth", authRoutes);

// Connect to Database
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;