// App.jsx
import React, { useState, useEffect } from "react";
import CreateNotes from "./notes/CreateNotes";
import ShowNotes from "./notes/ShowNotes";
import axios from "axios"
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Meeting Ideas", desc: "Brainstorming for Q2 planning..." },
    { id: 2, title: "Groceries List", desc: "Milk, Eggs, Bread, Cheese..." },
    { id: 3, title: "Book Chapters", desc: "Chapter 1: Introduction..." },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/notes").then((res) => {
      const formatted = res.data.notes.map((note) => ({
        id: note._id,
        title: note.title,
        desc: note.description,
      }));
      setNotes(formatted);
    });
  }, []); 

  // State to track if we are editing a specific note
  const [editingId, setEditingId] = useState(null);

  // 1. Submit Logic (Add New)
  const handleSubmit = async () => {
    try {
      if (!title || !desc) return alert("Please fill in both fields");
      const res = await axios.post("http://localhost:3000/notes",{
        title : title,
        description: desc
      })
      const saved = res.data.note ;
      const newNote = {
        id : saved._id,
        title : saved.title,
        desc : saved.description
      }
      setNotes([newNote,...notes])
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // 2. Delete Logic
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`)
      const updated = notes.filter((note)=>note.id !==id)
      setNotes(updated)
    } catch (error) {
      console.log(error);
    }
  };

  // 3. Edit Logic (Load data into inputs)
  const handleEdit = (note) => {
    setTitle(note.title);
    setDesc(note.desc);
    setEditingId(note.id); // Mark this ID as the one being edited
  };

  // 4. Update Logic (Save changes)
  const handleUpdate = () => {
    if (!editingId) return alert("Select a note to update first!");

    const updatedNotes = notes.map((note) => {
      if (note.id === editingId) {
        return { ...note, title, desc }; // Update only the matching note
      }
      return note;
    });

    setNotes(updatedNotes);
    resetForm();
  };

  // Helper to clear inputs
  const resetForm = () => {
    setTitle("");
    setDesc("");
    setEditingId(null);
  };

  return (
    <div className="app-container">
      <CreateNotes
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate} // Pass the update logic
        onClear={resetForm} // Pass the clear logic
      />
      <ShowNotes
        notes={notes}
        onDelete={handleDelete} // Pass delete function
        onEdit={handleEdit} // Pass edit function
      />
    </div>
  );
};

export default App;
