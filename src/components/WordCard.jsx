import React, { useState } from "react";
import "./WordCard.css";

function WordCard({ question, answer, onDelete, inFlushCard, onToggleFlushCard }) {
  // 初期は answer が表示される
  const [showAnswer, setShowAnswer] = useState(true);

  return (
    <div className="word-card">
      {/* クリックで表裏反転 */}
      <div
        className="text"
        onClick={() => setShowAnswer(prev => !prev)}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        {showAnswer ? (
          <p className="answer">{answer}</p>
        ) : (
          <p className="question">{question}</p>
        )}
      </div>

      <div className="word-card-buttons">
        <button className="delete-button" onClick={onDelete}>
          DELETE
        </button>

        <button
          className={`flushcard-button ${inFlushCard ? "on" : "off"}`}
          onClick={onToggleFlushCard}
        >
          {inFlushCard ? "📖 ON" : "📘 OFF"}
        </button>
      </div>
    </div>
  );
}

export default WordCard;
