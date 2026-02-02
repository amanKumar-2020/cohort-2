const app = require("./src/app");
const connectToDb = require("./src/config/database");
require("dotenv").config();

connectToDb();

app.listen(process.env.PORT || 3000 , ()=>{
  console.log(`our server is running on port:${process.env.PORT}`);
})