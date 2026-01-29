const app = require("./src/app")
require("dotenv").config()
const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")

connectToDb()
app.listen(process.env.PORT || 3000,()=>{
  console.log(`our server is running on port: ${process.env.PORT}`);
})