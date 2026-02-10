import React from "react";

// NotebookList コンポーネント
// ・ノート一覧を表示する
// ・ノートをクリックすると詳細ページへ移動（onSelect）
// ・削除ボタンでノートを削除（onDelete）
<link
  href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
  rel="stylesheet"
/>//フォントの呼び出し

function NotebookList({ notebooks, onDelete, onSelect }) {
  return (
    <div>
      <h2  className="handwriting">My Topics</h2>

      <ul>
        {notebooks.map((note) => (
          <li
            key={note.id}

            // ノート全体をクリックしたら詳細ページへ
            onClick={() => onSelect(note.id)}

            style={{
              cursor: "pointer",
              padding: "8px",
              border: "1px solid #ccc",
              marginBottom: "6px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* ノートのタイトル */}
            {note.title}

            {/* 削除ボタン */}
            <button
              onClick={(e) => {
                // ボタンのクリックが li のクリックに伝わらないようにする
                // （これがないと削除ボタンを押しても詳細ページに飛んでしまう）
                e.stopPropagation();

                // ノート削除処理
                onDelete(note.id);
              }}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookList;