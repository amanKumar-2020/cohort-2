import dotenv from "dotenv";

dotenv.config(); 

if (!process.env.PORT) {
  console.error("Error: PORT is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

if (!process.env.DATABASE_URI) {
  console.error("Error: DATABASE_URI is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

if (!process.env.JWT_SECRET_KEY) {
  console.error("Error: JWT_SECRET_KEY is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.DATABASE_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export default config;