import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";

export default function Quiz({ quizWords, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const cardRef = useRef(null);
  const [questionFont, setQuestionFont] = useState(48);
  const [answerFont, setAnswerFont] = useState(42);

  const word = quizWords[currentIndex];

  const nextWord = () => {
    setShowAnswer(false);
    if (currentIndex + 1 < quizWords.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  // フォントサイズ調整（word が存在する場合のみ）
  useEffect(() => {
    if (!word) return;
    const card = cardRef.current;
    if (!card) return;

    const adjustFont = (element, maxFont, minFont, setter) => {
      if (!element) return;
      let fontSize = maxFont;
      element.style.fontSize = `${fontSize}px`;

      while (element.scrollHeight > element.clientHeight && fontSize > minFont) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }

      setter(fontSize);
    };

    const questionEl = card.querySelector(".question");
    const answerEl = card.querySelector(".answer");

    adjustFont(questionEl, 48, 18, setQuestionFont);

    if (showAnswer) {
      adjustFont(answerEl, 42, 16, setAnswerFont);
    }
  }, [currentIndex, showAnswer, word]); // word が undefined になっても安全

  if (!word) return null;

  return (
    <div className="quiz-container">
      <div
        key={word.id}
        className="card"
        ref={cardRef}
        onClick={() => setShowAnswer(true)}
      >
        <h2 className="question" style={{ fontSize: `${questionFont}px` }}>
          {word.question}
        </h2>

        {showAnswer && (
          <p className="answer show" style={{ fontSize: `${answerFont}px` }}>
            {word.answer}
          </p>
        )}

        {!showAnswer && (
          <p style={{ fontSize: "12px", color: "#888" }}>クリックで答え表示</p>
        )}
      </div>

      <button className="next-button" onClick={nextWord}>
        次へ
      </button>
    </div>
  );
}
