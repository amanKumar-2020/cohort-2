import "dotenv/config";
import mongoose from "mongoose";

 async function connectToDb() {
   try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log("database connected")
   } catch (error) {
    console.error("database connection error :" + error)
    process.exit(1)
   }
}

export default connectToDb;