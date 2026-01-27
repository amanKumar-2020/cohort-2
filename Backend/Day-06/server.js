const app = require("./src/app");
const mongoose = require("mongoose")

function connectToDb(){
  mongoose.connect(
    "mongodb+srv://jnvaman7_db_user:AZTPn6DPamLEzrD3@cohort.sg6dshm.mongodb.net/"
  ).then(()=>{
    console.log("successful connect to db");
  })
}
connectToDb()

app.listen(3000,()=>{
  console.log(`Our server is running on localhost 3000`);
})