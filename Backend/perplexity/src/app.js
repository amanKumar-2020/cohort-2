import express from "express"
import connectToDb from "./config/database.js";
import errorHandler from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

connectToDb();

app.use("/api/auth" , authRouter)

app.use(errorHandler)
export default app;
