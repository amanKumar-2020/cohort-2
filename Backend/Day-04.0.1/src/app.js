const express = require("express")
const app = express();

app.use(express.json());

const notes =[];
app.get("/", (req,res)=>{
  res.send("hello from version v4.0.1")
})

app.post("/notes",(req,res)=>{
  console.log(req.body)
  res.send("Note successful added")
  notes.push(req.body);
  console.log(notes);
  
})

app.get("/notes",(req,res)=>{
   res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
  console.log(req.params.index);
  delete notes[req.params.index]
  console.log("delete successful");
  
})

module.exports = app ;