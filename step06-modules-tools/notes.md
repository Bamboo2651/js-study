# Step 6 - モジュール & 開発ツール

> **学習目安：** 1週間  
> **前提：** Step 5（Fetch API & JSON）完了済み  
> **次のステップ：** ミニ成果物② 天気アプリ（API連携）

---

## 📌 このステップで学ぶこと

- ESModules（`import` / `export`）の仕組み
- npm の基本的な使い方
- Vite を使った開発環境の構築
- Chrome DevTools によるデバッグ技術

---

## 1. ESModules

### なぜモジュールが必要か？

コードが増えてきたとき、すべてを1つのファイルに書くと管理が難しくなる。  
モジュールを使うと、機能ごとにファイルを分けて、必要なものだけを読み込める。

```
// ❌ 旧来の方法（グローバル汚染が起きやすい）
<script src="utils.js"></script>
<script src="main.js"></script>

// ✅ ESModules の方法
<script type="module" src="main.js"></script>
```

---

### export（エクスポート）

他のファイルから使えるように「公開」する。

```javascript
// utils.js

// 名前付きエクスポート（複数OK）
export function greet(name) {
  return `Hello, ${name}!`;
}

export const PI = 3.14159;

// デフォルトエクスポート（1ファイルに1つだけ）
export default function fetchData(url) {
  return fetch(url).then(res => res.json());
}
```

---

### import（インポート）

他のファイルの機能を読み込む。

```javascript
// main.js

// 名前付きインポート（{}で指定）
import { greet, PI } from './utils.js';

// デフォルトインポート（名前は自由につけられる）
import fetchData from './utils.js';

// まとめてインポート
import * as Utils from './utils.js';
// → Utils.greet('Alice') のように使う

console.log(greet('Alice'));  // "Hello, Alice!"
console.log(PI);              // 3.14159
```

> ⚠️ **注意点**
> - パスは `./` から始める（相対パス）
> - 拡張子 `.js` を省略できる場合とできない場合がある（Viteなら省略OK）
> - `type="module"` の `<script>` はデフォルトで `defer` 扱い

---

## 2. npm（Node Package Manager）

### npm とは？

世界中の開発者が作ったJSライブラリを簡単に使えるパッケージ管理ツール。

### 基本コマンド

```bash
# プロジェクトの初期化（package.json を作成）
npm init -y

# パッケージのインストール
npm install パッケージ名
npm install axios        # 例：HTTPクライアントライブラリ

# 開発時のみ使うパッケージ（本番ビルドに含めない）
npm install --save-dev パッケージ名
npm install --save-dev vite   # 例：Vite

# パッケージの削除
npm uninstall パッケージ名

# インストール済みパッケージの一覧
npm list
```

### package.json の構成

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",          // npm run dev で開発サーバー起動
    "build": "vite build",  // npm run build でビルド
    "preview": "vite preview"
  },
  "dependencies": {
    // 本番環境でも必要なパッケージ
  },
  "devDependencies": {
    "vite": "^5.0.0"        // 開発時のみ使うパッケージ
  }
}
```

> ⚠️ **`node_modules/` はGitに含めない**  
> `.gitignore` に `node_modules/` を追加する。  
> 他の人は `npm install` を実行するだけで再現できる。

---

## 3. Vite（ヴィート）

### Vite とは？

高速な開発サーバーとビルドツール。  
「ファイルを保存したらブラウザが即座に更新される」体験が得られる。

### プロジェクトの作成

```bash
# Vite プロジェクトを作成（バニラJSの場合）
npm create vite@latest my-app -- --template vanilla

cd my-app
npm install
npm run dev   # → http://localhost:5173 で開く
```

### Vite プロジェクトの構成

```
my-app/
├── index.html       ← エントリポイント（<script type="module"> が入っている）
├── main.js          ← JSのエントリポイント
├── style.css
├── package.json
├── vite.config.js   ← Viteの設定（必要に応じて）
└── node_modules/
```

### 主なコマンド

```bash
npm run dev      # 開発サーバー起動（ホットリロード有効）
npm run build    # 本番用ビルド（dist/ フォルダに出力）
npm run preview  # ビルド結果をローカルで確認
```

### 環境変数（APIキーの管理）

```bash
# .env ファイルに書く（.gitignore に追加すること！）
VITE_API_KEY=your_api_key_here
```

```javascript
// main.js で読み込む
const apiKey = import.meta.env.VITE_API_KEY;
```

> ⚠️ `VITE_` プレフィックスがないと読み込めない（セキュリティのため）

---

## 4. Chrome DevTools によるデバッグ

### よく使うパネル

| パネル | 用途 |
|--------|------|
| **Console** | `console.log` の出力、エラー確認 |
| **Sources** | ブレークポイントを使ったデバッグ |
| **Network** | APIリクエスト・レスポンスの確認 |
| **Elements** | HTMLの構造・CSSの確認 |

---

### Console パネル

```javascript
console.log('通常のログ');
console.warn('警告（黄色）');
console.error('エラー（赤）');
console.table([{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]); // 表形式で表示
console.group('グループ名');
  console.log('ネストされたログ');
console.groupEnd();
```

---

### Sources パネル（ブレークポイント）

1. DevTools を開く（F12 または右クリック→「検証」）
2. **Sources** タブを開く
3. 止めたい行番号をクリック → 青いマークが付く（ブレークポイント）
4. 処理がその行で一時停止 → 変数の値をホバーで確認できる

コード内に直接書く方法：
```javascript
function calculate(x, y) {
  debugger; // ← ここで処理が止まる（DevToolsが開いているとき）
  return x + y;
}
```

---

### Network パネル（API通信の確認）

1. DevTools を開く
2. **Network** タブを開く
3. ページをリロード or APIを呼び出す
4. 一覧からリクエストをクリック → Headers / Response で詳細確認

確認できること：
- リクエストURL・メソッド・ステータスコード
- リクエストヘッダー・ボディ
- レスポンスのJSONデータ
- 通信にかかった時間

---

## 📝 まとめ

| 概念 | ポイント |
|------|---------|
| ESModules | `export` で公開、`import` で読み込み。ファイルを機能ごとに分割できる |
| npm | パッケージ管理ツール。`npm install` でライブラリを追加 |
| Vite | 高速な開発サーバー＆ビルドツール。`npm run dev` で即開発開始 |
| DevTools | Console・Sources・Network を使いこなすとデバッグが格段に速くなる |

---

## 🔗 参考リンク

- [MDN - JavaScript モジュール](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)
- [Vite 公式ドキュメント](https://ja.vitejs.dev/)
- [npm 公式](https://docs.npmjs.com/)
- [Chrome DevTools 公式ガイド](https://developer.chrome.com/docs/devtools?hl=ja)

---

## ✅ 習得チェックリスト

- [ ] `export` / `import` を使ってファイルを分割できる
- [ ] 名前付きエクスポートとデフォルトエクスポートの違いを説明できる
- [ ] `npm init` でプロジェクトを初期化できる
- [ ] Vite で開発サーバーを起動できる
- [ ] `.env` でAPIキーを管理できる
- [ ] ブレークポイントを使ってデバッグできる
- [ ] Network パネルでAPIのレスポンスを確認できる

---

> 次は → **ミニ成果物②** 天気アプリ（`mini02-weather-app/`）