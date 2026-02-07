import React, { useState } from "react";

// 単語追加フォーム
// ・question（問題）
// ・answer（答え）
// を入力して NotebookDetail に渡す
function AddWordForm({ onAddWord }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) return;

    onAddWord(question, answer);

    // 入力欄をリセット
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button type="submit">Add Word</button>
    </form>
  );
}

export default AddWordForm;