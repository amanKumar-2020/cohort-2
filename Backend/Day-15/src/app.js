require("dotenv").config()
const express = require("express")
const connectToDb = require("./config/database")
const app = express()
app.use(express.json())
connectToDb()


module.exports = app;