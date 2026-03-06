const express =require("express")
const cookieParser = require("cookie-parser")
const connectToDb = require("./config/database")
const authRouter = require("./routes/auth.route")
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" , authRouter)


connectToDb();

module.exports = app;