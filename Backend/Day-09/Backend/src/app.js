const express = require("express");
const newModel = require("./models/note.model");
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await newModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "note created successful",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await newModel.find();
  res.status(200).json({
    message: "notes fetch successful",
    notes,
  });
});

app.patch("/notes/:index", async (req, res) => {
  const id = req.params.index;
  const { description } = req.body;

  const note = await newModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "note update successful",
    note,
  });
});

app.put("/notes/:index", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description){
    return res.status(400).json({
      error: "title or description is missing",
    });
  }
  const note = await newModel.findByIdAndUpdate(
    req.params.index,
    { title, description },
    { new: true },
  );

  res.status(200).json({
    message: "note update successful",
    note,
  });
});

app.delete("/notes/:index",async (req,res)=>{
  const id = req.params.index;
  const note = await newModel.findByIdAndDelete(id)
  res.status(200).json({
    message : "note delete successful",
    note
  })
})

module.exports = app;
