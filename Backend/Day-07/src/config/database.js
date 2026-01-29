const mongoose =require("mongoose")

function connectToDb() {
  mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("connected to database");
  });
}

module.exports = connectToDb;