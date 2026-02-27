const express = require("express")
const connectToDb = require("./config/database")
const authRouter = require("./router/user.route")
const app = express();

app.use(express.json());
connectToDb();

app.use("/api/auth",authRouter)

module.exports = app;