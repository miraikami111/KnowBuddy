



# KnowBuddy 🧠📚
カスタマイズできる単語帳アプリ（PWA対応）

## 🔗 URL
https://knowbuddy.vercel.app

## 🧩 Features
- 機能はできるだけシンプルに
- 単語帳（トピック）の追加・削除
- 追加したトピックを本棚（リスト）で管理
- トピックごとに単語（Question / Answer）の追加・削除
- 単語一覧表示
- FlashCard に追加（ON / OFF）
- FlashCard をクリックすると Answer 表示
- 前へ / 次へ移動ボタン
- 警告表示（ポップアップ）
- ローカルストレージ保存（デバイスごとに保存）

## 🎯 Purpose
通勤中の学習時間（電車の中の30分）を使って勉強しています。  
動画や本で学ぶことが多いので、帰りの時間に「朝の復習」ができる仕組みが欲しくなり、単語帳アプリを作りました。  
無料で、オフラインでも使えるアプリにしたかったため、PWA対応にしました。

## 🛠 Tech Stack
- **JavaScript / HTML / CSS**
- **React**
- **Vite**
- **PWA (vite-plugin-pwa)**
- **Vercel**（デプロイ）
- **GitHub**（バージョン管理）

## 💾 Data Storage
- localStorage（ブラウザに保存）
  - ※保存はデバイスごとに別になります

## 🚀 Getting Started
```bash
git clone https://github.com/miraikami111/KnowBuddy.git
cd KnowBuddy
npm install
npm run dev
