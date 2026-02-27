const express = require("express")
const connectToDb = require("./config/database")

const app = express();
connectToDb();
module.exports = app;