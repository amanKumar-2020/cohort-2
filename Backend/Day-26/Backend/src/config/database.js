const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDb() {
  await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log("successfully connected to db");
    })
    .catch((err) => {
      console.log("error at db connection" + err);
    });
}

module.exports = connectToDb;