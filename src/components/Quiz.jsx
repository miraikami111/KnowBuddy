// Quiz.jsx
import React, { useState } from "react";

export default function Quiz({ quizWords, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (quizWords.length === 0) return <p>単語がありません</p>;

  const word = quizWords[currentIndex];

  const nextWord = () => {
    setShowAnswer(false);
    if (currentIndex + 1 < quizWords.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          border: "2px solid #333",
          borderRadius: "8px",
          padding: "40px 20px",
          marginBottom: "80px",
          cursor: "pointer"
        }}
        onClick={() => setShowAnswer(true)}
      >
        <h2>{word.question}</h2>
        {showAnswer && <p>{word.answer}</p>}
        <p style={{ fontSize: "12px", color: "#888" }}>クリックで答え表示</p>
      </div>

      <button
        style={{ position: "absolute", bottom: "20px", padding: "10px 30px" }}
        onClick={nextWord}
      >
        次へ
      </button>
    </div>
  );
}
