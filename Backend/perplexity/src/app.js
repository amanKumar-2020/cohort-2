import express from "express"
import connectToDb from "./config/database.js";
import errorHandler from "./middleware/error.middleware.js"
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

connectToDb();

app.use("/api/auth" , authRouter)

app.use(errorHandler)
export default app;
