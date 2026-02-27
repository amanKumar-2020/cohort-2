const mongoose =require("mongoose")
require("dotenv").config()

async function connectToDb() {
 await mongoose.connect(process.env.DATABASE_URI)
  .then(()=>{
    console.log("successfully connected to DB");
  })
  .catch(err=>console.log("error at connecting DB",err))
}

module.exports = connectToDb;