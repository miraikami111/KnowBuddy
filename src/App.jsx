import React, { useState, useEffect } from 'react'
import AddNotebook from './components/AddNotebook'
import NotebookList from './components/NotebookList'
import NotebookDetail from './components/NotebookDetail'
import SplashScreen from './components/SplashScreen.jsx';

function App() {
  const [notebooks, setNotebooks] = useState([])
  const [selectedNotebook, setSelectedNotebook] = useState(null)

  // ★ 読み込み完了フラグ
  const [loaded, setLoaded] = useState(false)

  // ★ ① localStorage から読み込む
  useEffect(() => {
    const saved = localStorage.getItem("notebooks")
    if (saved) {
      setNotebooks(JSON.parse(saved))
    }
    setLoaded(true)
  }, [])

  // ★ ② 読み込み完了後だけ保存する
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notebooks", JSON.stringify(notebooks))
    }
  }, [notebooks, loaded])

  // ★ ノート追加
  function handleAddNotebook(title) {
    const newNotebook = {
      id: Date.now(),
      title,
      words: []   // ← これが絶対必要！
    };
    setNotebooks([...notebooks, newNotebook]);
  }

  // ★ ノート削除
  function handleDeleteNotebook(id) {
    setNotebooks(notebooks.filter(n => n.id !== id));
  }

  // ★ 単語追加
  function handleAddWord(notebookId, question, answer) {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? {
              ...nb,
              words: [
                ...nb.words,
                {
                  id: Date.now(),
                  question,
                  answer
                }
              ]
            }
          : nb
      )
    );
  }

  // ★ 単語削除
  function handleDeleteWord(notebookId, wordId) {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? {
              ...nb,
              words: nb.words.filter(w => w.id !== wordId)
            }
          : nb
      )
    );
  }

  // ★ スプラッシュ画面
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  // ★ 詳細ページ
  if (selectedNotebook !== null) {
    const notebook = notebooks.find(n => n.id === selectedNotebook)

    return (
      <NotebookDetail
        notebook={notebook}
        onBack={() => setSelectedNotebook(null)}
        onAddWord={(q, a) => handleAddWord(selectedNotebook, q, a)}
        onDeleteWord={(wordId) => handleDeleteWord(selectedNotebook, wordId)}
      />
    )
  }

  // ★ 一覧ページ
  return (
    <div style={{ padding: '20px' }}>
      <h1>KnowBuddy</h1>

      <AddNotebook onAdd={handleAddNotebook} />

      <NotebookList
        notebooks={notebooks}
        onDelete={handleDeleteNotebook}
        onSelect={(id) => setSelectedNotebook(id)}
      />
    </div>
  )
}

export default App