const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = function(){
  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log("connected to DB");
  })
}

module.exports = connectToDb ;