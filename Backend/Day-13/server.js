const app = require("./src/app")
require("dotenv").config();

app.listen(process.env.PORT || 3000 , ()=>{
  console.log(`Our server is running on PORT : ${process.env.PORT}`);
})