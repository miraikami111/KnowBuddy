// React の描画機能を使うための関数をインポート
// createRoot は React アプリを画面に表示するために必要
import { createRoot } from 'react-dom/client'

// 全体に適用するCSSを読み込む
import './index.css'

// Appコンポーネント用のCSSを読み込む
import './App.css'

// アプリの本体コンポーネントを読み込む
// これがアプリの「司令塔」
import App from './App.jsx'

// PWA（アプリ化）機能のためのService Worker登録関数を読み込む
// これでオフライン対応やホーム画面追加が可能になる
import { registerSW } from 'virtual:pwa-register'


// index.html にある <div id="root"></div> を取得して
// その中に Reactアプリを描画する
createRoot(document.getElementById('root')).render(
  <App />   // Appコンポーネントを画面に表示
)


// Service Worker を登録する
// immediate: true は「すぐ登録する」という意味
// これでPWA機能（キャッシュ・アプリ化）が有効になる
registerSW({ immediate: true })
