const express =require("express")
const connectToDb = require("./config/database")
const app = express()

//middleware
app.use(express.json())

connectToDb();

module.exports = app;