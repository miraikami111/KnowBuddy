import React, { useState, useEffect } from "react";
import WordCard from "./WordCard";
import AddWordForm from "./AddWordForm";
import "./NotebookDetail.css";
import Light01 from "../assets/Light01.png";


function NotebookDetail({ notebook, onBack, onAddWord, onDeleteWord, onStartQuiz }) {
  if (!notebook) {
    return (
      <div className="notebook-detail">
        <p>Notebook not found.</p>
        <button onClick={onBack} className="action-button">Back</button>
      </div>
    );
  }

  const storageKey = `flushCardWords_${notebook.id}`;
  const [flushCardWords, setFlushCardWords] = useState([]);

  // 初期化時に localStorage から読み込み
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setFlushCardWords(JSON.parse(saved));
  }, [storageKey]);

  // flushCardWords が更新されたら localStorage に保存
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(flushCardWords));
  }, [flushCardWords, storageKey]);

  const toggleFlushCard = (wordId) => {
    setFlushCardWords(prev =>
      prev.includes(wordId)
        ? prev.filter(id => id !== wordId)
        : [...prev, wordId]
    );
  };

  return (
    <div className="notebook-detail">
  {/* ライトのイラスト追加 */}
       <img
      src={Light01}
      alt="icon"
      className="corner-icon"
    />

      <h2 className="handwriting2">{notebook.title}</h2>



  


      <div className="notebook-buttons">
        <button onClick={onBack} className="action-button">Back</button>

        <button 
        className="action-button flashcard"
          onClick={() => onStartQuiz(flushCardWords)}
         
        >
          Flashcard🚀
        </button>
      </div>

      <AddWordForm onAddWord={onAddWord} />

      <div className="word-list">
        {notebook.words.map(word => (
          <WordCard
            key={word.id}
            question={word.question}
            answer={word.answer}
            onDelete={() => onDeleteWord(word.id)}
            inFlushCard={flushCardWords.includes(word.id)}
            onToggleFlushCard={() => toggleFlushCard(word.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default NotebookDetail;
