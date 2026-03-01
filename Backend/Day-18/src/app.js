const express = require("express")
const cookieParser = require("cookie-parser")
const connectToDb = require("./config/database")
const authRouter = require("./router/user.route")
const postRouter = require("./router/post.route")
const app = express();

app.use(express.json());
app.use(cookieParser())
connectToDb();

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)

module.exports = app;