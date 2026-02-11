require("dotenv").config()
const mongoose = require("mongoose")

async function connectToDb() {
 await mongoose.connect(process.env.DATABASE_URL)
  console.log("now database is connected successful");
  
}  
module.exports = connectToDb;