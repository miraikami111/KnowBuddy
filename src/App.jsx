import React, { useState, useEffect } from "react";
import AddNotebook from "./components/AddNotebook";
import NotebookList from "./components/NotebookList";
import NotebookDetail from "./components/NotebookDetail";
import Quiz from "./components/Quiz";
import SplashScreen from "./components/SplashScreen"; // ここを追加





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
    setNotebooks(notebooks.filter(n => n.id !== id));
  };

  // 単語追加
  const handleAddWord = (notebookId, question, answer) => {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? { ...nb, words: [...nb.words, { id: Date.now(), question, answer }] }
          : nb
      )
    );
  };

  // 単語削除
  const handleDeleteWord = (notebookId, wordId) => {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? { ...nb, words: nb.words.filter(w => w.id !== wordId) }
          : nb
      )
    );
  };

  // Notebook単位でクイズ開始
  const startQuiz = (notebook) => {
    if (notebook.words.length === 0) {
      alert("単語がありません！");
      return;
    }
    const shuffledWords = [...notebook.words].sort(() => Math.random() - 0.5);
    setQuizWords(shuffledWords);
    setShowQuiz(true);
  };

  // クイズ終了
  const finishQuiz = () => setShowQuiz(false);

  // ----------------------------
  // 表示切り替え順序
  // ----------------------------

  // ① スプラッシュ画面
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // ② クイズ画面
  if (showQuiz) {
    return <Quiz quizWords={quizWords} onFinish={finishQuiz} />;
  }

  // ③ Notebook詳細
  if (selectedNotebook !== null) {
    const notebook = notebooks.find(n => n.id === selectedNotebook);
    return (
      <NotebookDetail
        notebook={notebook}
        onBack={() => setSelectedNotebook(null)}
        onAddWord={(q, a) => handleAddWord(selectedNotebook, q, a)}
        onDeleteWord={(wordId) => handleDeleteWord(selectedNotebook, wordId)}
        onStartQuiz={() => startQuiz(notebook)}
      />
    );
  }

  // ④ Notebook一覧ページ
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="marumoji">KnowBuddy</h1>
      <AddNotebook onAdd={handleAddNotebook} />
      <NotebookList
        notebooks={notebooks}
        onDelete={handleDeleteNotebook}
        onSelect={(id) => setSelectedNotebook(id)}
      />
    </div>
  );
}

export default App;
