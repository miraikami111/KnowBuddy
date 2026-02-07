import React, { useState, useEffect } from 'react'
import AddNotebook from './components/AddNotebook'
import NotebookList from './components/NotebookList'
import NotebookDetail from './components/NotebookDetail'
import SplashScreen from './src/SplashScreen'   // ← 追加

function App() {
  const [notebooks, setNotebooks] = useState([])
  cnst [selectedNotebook, setSelectedNotebook] = useState(null)

  // ★ 読み込み完了フラグ
  const [loaded, setLoaded] = useState(false)

  // ★ ① localStorage から読み込む
  useEffect(() => {
    const saved = localStorage.getItem("notebooks")
    if (saved) {
      setNotebooks(JSON.parse(saved))
    }
    setLoaded(true) // ← 読み込み完了
  }, [])

  // ★ ② 読み込み完了後だけ保存する
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notebooks", JSON.stringify(notebooks))
    }
  }, [notebooks, loaded])

  // ★ スプラッシュ画面
const [showSplash, setShowSplash] = useState(true)

// ★ スプラッシュ画面を最優先で表示
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