//ノート(単語帳)に追加する機能
import React, { useState } from "react";

//AddNotebookのcomponent
//単語帳のタイトルを追加するためのフォーム
function AddNotebook({ onAdd }) {
  //入力欄の中身を管理するためのstate
  const [title, setTitle] = useState('');

  //追加ボタンが押された時の処理
  const handleAdd = () => {
    //空欄なら何もしない
    if (title.trim() === '') return;

    // 文字数オーバーなら警告
    if (title.length > 10) {
    alert("タイトルは10文字以内にしてください");
    return;
  }
    // 親(App.jsx)に新しいノートのタイトルを渡す
    onAdd(title);

    //入力欄を空に戻す
    setTitle('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* 入力欄 */}
      <input
        type="text"
        placeholder="Please enter a title of this note ☞"
        value={title}                     // ← 入力欄の中身
         maxLength={10}   // ← 文字数を10文字までに制限
        onChange={(e) => setTitle(e.target.value)}  // ← 入力が変わったら更新
      />

      {/* 追加ボタン */}
      <button onClick={handleAdd}>Add My note💡</button>
    </div>
  );
}

export default AddNotebook;
