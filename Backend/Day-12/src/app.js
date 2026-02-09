const express = require("express") 
const noteRouter = require("./routes/note.route")
const app = express();
app.use(express.json())

app.use("/notes", noteRouter)

module.exports = app ;