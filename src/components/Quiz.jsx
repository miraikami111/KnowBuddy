import React, { useState } from "react";
import "./Quiz.css";

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
      onFinish(); // Quiz 終了
    }
  };

  const prevWord = () => {
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goBack = () => {
    onFinish(); // NotebookDetail に戻る
  };

  return (
    <div className="quiz-wrapper">
      {/* カード */}
      <div
        key={word.id}
        className="card"
        onClick={() => setShowAnswer(prev => !prev)}
      >
        {showAnswer ? (
          <p className="answer">{word.answer}</p>
        ) : (
          <h2>{word.question}</h2>
        )}
        {!showAnswer && <p className="hint">クリックで答え表示</p>}
      </div>

      {/* カード外ボタン */}
      <div className="quiz-controls">
        <button onClick={prevWord} disabled={currentIndex === 0}>
          ← 前のカード
        </button>
        <button onClick={nextWord} disabled={currentIndex === quizWords.length - 1}>
          次へ →
        </button>
        <button onClick={goBack}>
          前の画面に戻る
        </button>
      </div>
    </div>
  );
}
