require("dotenv").config()
const mongoose = require("mongoose")

async function connectToDb() {
  await mongoose.connect(process.env.DATABASE_URI)
  console.log("connected to database");
}

module.exports = connectToDb;