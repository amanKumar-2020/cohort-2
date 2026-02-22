require("dotenv").config()
const express = require("express")
const connectToDb = require("./config/database")
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const app = express()
app.use(express.json())
app.use(cookieParser());

connectToDb()

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)

module.exports = app;