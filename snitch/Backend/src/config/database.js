import mongoose from "mongoose";
import config from "./config.js";

async function connectToDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectToDB;