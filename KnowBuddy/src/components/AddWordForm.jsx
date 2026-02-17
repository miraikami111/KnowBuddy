import React, { useState } from "react";
import notice from "../assets/notice.png";


function AddWordForm({ onAddWord }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const maxLength = 50;

  const getFontSize = (text) => {
    const length = text.length;
    if (length === 0) return 16;
    if (length <= 10) return 24;
    if (length <= 20) return 20;
    if (length <= 35) return 18;
    return 16;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (question.length > maxLength || answer.length > maxLength) {
      setError(`Question と Answer は ${maxLength} 文字以内にしてください`);
      return;
    }

    if (!question.trim() || !answer.trim()) return;

    onAddWord(question, answer);

    setQuestion("");
    setAnswer("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

  
      
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={maxLength}
          style={{
            marginRight: "10px",
            fontSize: `${getFontSize(question)}px`,
            width: "250px",
          }}
        />

        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          maxLength={maxLength}
          style={{
            marginRight: "10px",
            fontSize: `${getFontSize(answer)}px`,
            width: "250px",
          }}
        />
      </div>

      <button type="submit">Add Word</button>
      
    <img
  src={notice}
  alt="Flashcard guide"
  style={{
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    display: "block",
    margin: "20px auto",
  }}
/>

      
      
      

      {error && (
        <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {error}
        </div>

      )}

    </form>
  );
}

export default AddWordForm;
