// CreateNotes.jsx
import React from "react";

const CreateNotes = ({
  title,
  setTitle,
  desc,
  setDesc,
  onSubmit,
  onUpdate,
  onClear,
}) => {
  // (Date logic remains the same as before...)
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr =
    now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="create-section">
      <div className="header">
        <h1>My Notes</h1>
        <div className="date-display">
          <div>{dateStr}</div>
          <div>{timeStr}</div>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          className="custom-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="custom-textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn btn-delete" onClick={onClear}>
          Clear
        </button>
        <button className="btn btn-update" onClick={onUpdate}>
          Update
        </button>
        <button className="btn btn-submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateNotes;
