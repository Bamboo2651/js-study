# Step 2 - DOM操作 & イベント

## ✅ 学習内容まとめ

### 要素の取得

```javascript
// CSSセレクタで取得（現代ではこれを主に使う）
const el = document.querySelector("#id名");
const el = document.querySelector(".class名");
const els = document.querySelectorAll("li"); // 複数取得

// id専用（古いコードでよく見かける）
const el = document.getElementById("id名");
```

> `querySelector` はCSSセレクタをそのまま使えるので、一本覚えればOK。

---

### テキスト・内容の変更

```javascript
el.textContent = "新しいテキスト"; // テキストだけ変える（安全）
el.innerHTML = "<strong>HTML込み</strong>"; // HTMLごと変える
el.style.color = "red"; // CSSを直接変える
```

> `textContent` はプロパティなので `=` で代入。`()` はつけない。

---

### イベント処理

```javascript
const btn = document.querySelector("#btn");

btn.addEventListener("イベント名", function () {
    // イベント発生時の処理
});
```

| イベント名 | 発生タイミング |
|---|---|
| `click` | クリックしたとき |
| `input` | 入力欄の文字が変わるたび |
| `change` | 入力欄から離れたとき |
| `submit` | フォームが送信されたとき |

---

### フォームイベント（リアルタイム反映）

```javascript
const inputText = document.querySelector("#inputText");
const outText = document.querySelector("#outText");

inputText.addEventListener("input", function () {
    outText.textContent = inputText.value; // .value で入力中の文字を取得
});
```

---

### クラスの付け外し（classList）

```javascript
el.classList.add("クラス名");    // クラスを追加
el.classList.remove("クラス名"); // クラスを削除
el.classList.toggle("クラス名"); // あれば削除・なければ追加
```

> `querySelector` と違い、クラス名に `.` は不要。

---

## 🗂️ 作ったもの

- `index.html` + `main.js`
  - ボタンクリックでテキスト変更
  - テキストボックス入力のリアルタイム反映
  - ボタンクリックでクラス付け外し（色の切り替え）