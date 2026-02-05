// ShowNotes.jsx
import React from "react";

const ShowNotes = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="show-section">
      <h2 className="section-title">My Notes</h2>

      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.desc}</p>
              </div>

              <div className="card-actions">
                {/* Delete Button */}
                <button
                  className="btn-small btn-delete"
                  onClick={() => onDelete(note.id)}
                >
                  Delete
                </button>

                {/* Update Button (Loads data to input) */}
                <button
                  className="btn-small btn-update"
                  onClick={() => onEdit(note)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#888" }}>No notes yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default ShowNotes;
