const app  = require("./src/app")
require("dotenv").config()
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(process.env.PORT || 3000 , ()=>{
  console.log(`our server is running on PORT: ${process.env.PORT}`);
})