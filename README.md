# JavaScript 学習ロードマップ

> **対象者：** HTML/CSS既習・JS初心者  
> **ゴール：** ReactでWebアプリが作れるレベルになる  
> **目安：** 1ステップ ≈ 1週間

---

## 📍 現在地・進捗

- [x] **Step 1** - JS基礎構文
- [x] **Step 2** - DOM操作 & イベント
- [x] **Step 3** - 配列・オブジェクト操作
- [x] **🎯 ミニ成果物①** - ToDoリスト（JS単体）
- [x] **Step 4** - 非同期処理
- [x] **Step 5** - Fetch API & JSON
- [x] **Step 6** - モジュール & 開発ツール
- [x] **🎯 ミニ成果物②** - 天気アプリ（API連携）
- [ ] **Step 7** - クラス & 設計の基礎
- [ ] **Step 8** - LocalStorage & 状態管理
- [ ] **Step 9** - React入門
- [ ] **🏆 最終成果物** - タスク管理アプリ（React・API連携・永続化）

---

## 🗺️ ロードマップ全体

### フェーズ1：基礎（Step 1〜3）

| Step | テーマ | 学習内容 |
|------|--------|----------|
| 1 | JS基礎構文 | 変数・型・演算子・条件分岐・ループ・関数・スコープ |
| 2 | DOM操作 & イベント | 要素取得・内容変更・クリック/フォームイベント |
| 3 | 配列・オブジェクト操作 | map / filter / find / スプレッド構文 |
| 🎯 | ミニ成果物① | ToDoリスト（JS単体・追加・削除・完了チェック） |

### フェーズ2：中級（Step 4〜6）

| Step | テーマ | 学習内容 |
|------|--------|----------|
| 4 | 非同期処理 | Promise・async/await・setTimeout・エラーハンドリング |
| 5 | Fetch API & JSON | 外部APIの取得・JSONパース・画面への表示 |
| 6 | モジュール & 開発ツール | ESModules・npm・Vite・DevToolsデバッグ |
| 🎯 | ミニ成果物② | 天気アプリ（OpenWeatherMap等のAPI連携） |

### フェーズ3：応用（Step 7〜9）

| Step | テーマ | 学習内容 |
|------|--------|----------|
| 7 | クラス & 設計の基礎 | class構文・カプセル化・責務分離の考え方 |
| 8 | LocalStorage & 状態管理 | データ永続化・状態の一元管理パターン |
| 9 | React入門 | コンポーネント・useState・useEffect・props |
| 🏆 | 最終成果物 | タスク管理アプリ（React・API連携・LocalStorage永続化） |

---

## 📁 フォルダ構成

```
js-study/
├── README.md
├── step01-basics/
│   ├── notes.md
│   ├── index.html
│   └── main.js
├── step02-dom/
│   ├── notes.md
│   ├── index.html
│   └── main.js
├── step03-array-object/
│   └── notes.md
├── mini01-todo/
│   ├── index.html
│   └── main.js
├── step04-async/
│   └── notes.md
├── step05-fetch/
│   └── notes.md
├── step06-modules-tools/
│   └── notes.md
├── mini02-weather-app/
│   ├── index.html
│   └── main.js
├── step07-class-design/
│   └── notes.md
├── step08-localstorage/
│   └── notes.md
├── step09-react/
│   └── notes.md
└── final-task-app/
    ├── src/
    └── package.json
```