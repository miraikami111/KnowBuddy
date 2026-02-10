import React, { useState } from "react";

function AddWordForm({ onAddWord }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const maxLength = 50; // 最大文字数

  // 文字数に応じてフォントサイズを計算
  const getFontSize = (text) => {
    const length = text.length;
    if (length === 0) return 16; // 空の場合のサイズ
    if (length <= 10) return 24; // 10文字以下は大きく
    if (length <= 20) return 20;
    if (length <= 35) return 18;
    return 16; // 35文字以上は小さめ
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 文字数チェック
    if (question.length > maxLength || answer.length > maxLength) {
      setError(`Question と Answer は ${maxLength} 文字以内にしてください`);
      return;
    }

    if (!question.trim() || !answer.trim()) return;

    onAddWord(question, answer);

    // リセット
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
          maxLength={maxLength} // HTML の maxlength 属性でも制限可能
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

      {error && (
        <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default AddWordForm;
