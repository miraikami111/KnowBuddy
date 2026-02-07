import React, { useState, useEffect } from 'react'
import AddNotebook from './components/AddNotebook'
import NotebookList from './components/NotebookList'
import NotebookDetail from './components/NotebookDetail'

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
    setLoaded(true) // ← 読み込み完了
  }, [])

  // ★ ② 読み込み完了後だけ保存する
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notebooks", JSON.stringify(notebooks))
    }
  }, [notebooks, loaded])

  // ★ 単語帳追加
  const handleAddNotebook = (title) => {
    const newNotebook = {
      id: Date.now(),
      title,
      words: []
    }
    setNotebooks(prev => [...prev, newNotebook])
  }

  // ★ 単語帳削除
  const handleDeleteNotebook = (id) => {
    const ok = window.confirm("Are you sure that you want to 'Delete'?")
    if (!ok) return
    setNotebooks(prev => prev.filter(note => note.id !== id))
  }

  // ★ 単語追加
  const handleAddWord = (notebookId, question, answer) => {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? {
              ...nb,
              words: [...nb.words, { id: Date.now(), question, answer }]
            }
          : nb
      )
    )
  }

  // ★ 単語削除
  const handleDeleteWord = (notebookId, wordId) => {
    setNotebooks(prev =>
      prev.map(nb =>
        nb.id === notebookId
          ? {
              ...nb,
              words: nb.words.filter(w => w.id !== wordId)
            }
          : nb
      )
    )
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