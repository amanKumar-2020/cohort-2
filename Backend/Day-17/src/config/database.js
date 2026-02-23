const mongoose = require("mongoose")
require("dotenv").config()

async function connectToDb() {
  await mongoose.connect(process.env.DATABASE_URI)
  .then(()=>{
    console.log("database connected successful");
  })
}

module.exports = connectToDb;