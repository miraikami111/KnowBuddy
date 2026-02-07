import React, { useState } from "react";

function WordCard({ question, answer, onDelete }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      onClick={() => setShowAnswer(!showAnswer)}
      style={{
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer",
        background: "#f9f9f9",
      }}
    >
      {showAnswer ? answer : question}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{
          marginLeft: "10px",
          background: "#ff6666",
          color: "white",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default WordCard;