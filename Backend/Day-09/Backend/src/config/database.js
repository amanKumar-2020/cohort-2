const mongoose = require("mongoose")
require("dotenv").config();

const connectToDb = function (){
  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log("our data base connected successful");
  })
}
 module.exports = connectToDb;