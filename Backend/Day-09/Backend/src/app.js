const express = require("express")
const newModel = require("./models/note.model")
const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
  res.status(200).json({
    message:"It's all ok !!!"
  })
})

app.post("/notes",async (req,res)=>{
  const {title , description } = req.body;

 const note = await newModel.create({
  title , description
 })
 res.status(201).json({
  message: "note created successful",
  note
 })
})

module.exports = app ;