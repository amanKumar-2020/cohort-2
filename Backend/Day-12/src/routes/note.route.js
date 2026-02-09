const express = require("express")
const noteModel = require("../models/notes.model")
const noteRouter = express.Router();

noteRouter.post("/",async (req, res)=>{
  const {title , description} = req.body ;
  const note = await noteModel.create({
    title , description
  })
  res.status(201).json({
    message : "Note created successful",
    note
  })
})

noteRouter.get("/", async (req,res)=>{
  const notes = await noteModel.find()
  res.status(200).json({
    message: "All notes are here" , 
    notes
  })
})

noteRouter.delete("/:index" , async (req,res)=>{
  const deletedNote = await noteModel.findByIdAndDelete(req.params.index);
  res.status(200).json({
    message : "note delete successful",
    deletedNote
  })
})
module.exports = noteRouter ;