import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  console.error("Error: PORT is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

if (!process.env.DATABASE_URI) {
  console.error(
    "Error: DATABASE_URI is not defined in the environment variables.",
  );
  process.exit(1); // Exit the process with an error code
}

if (!process.env.JWT_SECRET_KEY) {
  console.error(
    "Error: JWT_SECRET_KEY is not defined in the environment variables.",
  );
  process.exit(1); // Exit the process with an error code
}

if (!process.env.REDIS_URL) {
  console.error(
    "Error: REDIS_URL is not defined in the environment variables.",
  );
  process.exit(1); // Exit the process with an error code
}

if (!process.env.GOOGLE_CLIENT_ID) {
  console.error(
    "Error: GOOGLE_CLIENT_ID is not defined in the environment variables.",
  );
  process.exit(1); // Exit the process with an error code
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error(
    "Error: GOOGLE_CLIENT_SECRET is not defined in the environment variables.",
  );
  process.exit(1); // Exit the process with an error code
}

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3000",
  MONGO_URI: process.env.DATABASE_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REDIS_URL: process.env.REDIS_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default config;
