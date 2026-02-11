import React from "react";

function NotebookList({ notebooks, onDelete, onSelect }) {
  return (
    <div>
      <h2 className="handwriting">My Topics</h2>

      <ul>
        {notebooks.map((note) => (
          <li
            key={note.id}
            onClick={() => onSelect(note.id)}
            style={{
              cursor: "pointer",
              padding: "8px",
              border: "1px solid #ccc",
              marginBottom: "6px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>{note.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const ok = window.confirm(
                  `「${note.title}」を本当に削除しますか？`
                );
                if (ok) onDelete(note.id);
              }}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookList;
