const express =  require("express");
const app = express();

app.get("/",(req,res)=>{
  res.status(200).json({
    message: "welcome to our world"
  })
})


module.exports = app;