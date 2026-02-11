import React, { useState, useEffect } from "react";
import AddNotebook from "./components/AddNotebook";
import NotebookList from "./components/NotebookList";
import NotebookDetail from "./components/NotebookDetail";
import Quiz from "./components/Quiz";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  // スプラッシュ管理
  const [showSplash, setShowSplash] = useState(true);

  // クイズ管理
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizWords, setQuizWords] = useState([]);

  // localStorage読み込み
  useEffect(() => {
    const saved = localStorage.getItem("notebooks");
    if (saved) setNotebooks(JSON.parse(saved));
  }, []);

  // localStorage保存
  useEffect(() => {
    localStorage.setItem("notebooks", JSON.stringify(notebooks));
  }, [notebooks]);

  // Notebook追加
  const handleAddNotebook = (title) => {
    const newNotebook = { id: Date.now(), title, words: [] };
    setNotebooks([...notebooks, newNotebook]);
  };

  // Notebook削除
  const handleDeleteNotebook = (id) => {
  setNotebooks(prev => prev.filter(n => n.id !== id));

  // もし今開いてるノートを消したなら、一覧に戻る
  if (selectedNotebook === id) {
    setSelectedNotebook(null);
  }
};


  // 単語追加
  const handleAddWord = (notebookId, question, answer) => {
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId
          ? { ...nb, words: [...nb.words, { id: Date.now(), question, answer }] }
          : nb
      )
    );
  };

  // 単語削除
  const handleDeleteWord = (notebookId, wordId) => {
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId
          ? { ...nb, words: nb.words.filter((w) => w.id !== wordId) }
          : nb
      )
    );
  };

  // Notebook単位でクイズ開始
  const startQuiz = (notebook, flushCardWords) => {
    const quizWords = notebook.words.filter((word) =>
      flushCardWords.includes(word.id)
    );

    if (quizWords.length === 0) {
      alert("FlushCardに追加された単語がありません！");
      return;
    }

    const shuffledWords = [...quizWords].sort(() => Math.random() - 0.5);
    setQuizWords(shuffledWords);
    setShowQuiz(true);
  };

  const finishQuiz = () => setShowQuiz(false);

  // 表示切り替え
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;
  if (showQuiz) return <Quiz quizWords={quizWords} onFinish={finishQuiz} />;
  if (selectedNotebook !== null) {
    const notebook = notebooks.find((n) => n.id === selectedNotebook);
    return (
      <NotebookDetail
        notebook={notebook}
        onBack={() => setSelectedNotebook(null)}
        onAddWord={(q, a) => handleAddWord(selectedNotebook, q, a)}
        onDeleteWord={(wordId) => handleDeleteWord(selectedNotebook, wordId)}
        onStartQuiz={(flushCardWords) => startQuiz(notebook, flushCardWords)}
      />
    );
  }

  return (
    <div className="app-shell">
      <div className="app-card">
        <h1 className="marumoji">KnowBuddy</h1>

        <AddNotebook onAdd={handleAddNotebook} />

        <NotebookList
          notebooks={notebooks}
          onDelete={handleDeleteNotebook}
          onSelect={(id) => setSelectedNotebook(id)}
        />
      </div>
    </div>
  );
} // ← ここが必要！

export default App;
