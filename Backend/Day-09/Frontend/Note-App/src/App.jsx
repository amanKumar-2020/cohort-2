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
      console.log(res.data.notes);
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
  const handleSubmit = () => {
    if (!title || !desc) return alert("Please fill in both fields");
    const newNote = { id: Date.now(), title, desc };
    setNotes([newNote, ...notes]);
    resetForm();
  };

  // 2. Delete Logic
  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
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
