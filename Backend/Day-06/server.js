const app = require("./src/app")
const mongoose = require("mongoose")
require("dotenv").config()

function connectToDb(){

  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db")
  });
}

connectToDb();

app.listen(3000,()=>{
  console.log(`our server is running on port:3000`);
})
