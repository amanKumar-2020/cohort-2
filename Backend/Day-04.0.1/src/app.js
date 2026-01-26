const express = require("express")
const app = express();

app.use(express.json());

const notes =[];
app.get("/", (req,res)=>{
  res.send("hello from version v4.0.1")
})

app.post("/notes",(req,res)=>{
  notes.push(req.body);
  res.status(201).json({
    message: "note created successful",
    note: req.body
  })
  
})

app.get("/notes", (req, res) => {
  res.status(200).json({notes});
});

app.delete("/notes/:index",(req,res)=>{
  console.log(req.params.index);
  delete notes[req.params.index]

  res.status(204).json({
    message:"note delete successful",
  })
})


app.put("/notes/:index",(req,res)=>{
  console.log(req.params.index);
  notes[req.params.index] = req.body
  res.status(200).json({
    message: "note update successful"
  })
})

module.exports = app ;