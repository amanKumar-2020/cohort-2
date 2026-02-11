const express = require("express");
const connectToDb = require("./config/database");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const app = express()
app.use(express.json())
app.use(cookieParser())
connectToDb()

app.use("/api/auth",authRouter)

module.exports = app;
