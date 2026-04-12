# ミニ成果物① - ToDoリスト

## ✅ 実装した機能

- テキストボックスに入力してボタンを押すとタスクが追加される
- 削除ボタンを押すとタスクが消える
- タスクをクリックすると完了チェック（取り消し線）がつく

---

## 📁 ファイル構成

```
mini01-todo/
├── index.html
└── main.js
```

---

## 🗺️ 実装の流れ

### HTML の構造

```html
<ul id="todoList"></ul>  <!-- liはJSで動的に追加するので空でいい -->

<input type="text" id="inputText">
<button id="push">追加</button>
```

### JS の構造

```
ボタンクリック
├── li を作る
├── span を作る（テキスト）
├── deleteBtn を作る（削除ボタン）
├── span → li に追加
├── deleteBtn → li に追加
├── li → ul に追加
├── deleteBtn クリック → li を ul から削除
└── span クリック → .done を toggle
```

---

## 💡 重要なポイント

### 要素の動的生成

```javascript
const li = document.createElement("li");
li.textContent = "テキスト";
ul.appendChild(li); // ulの中にliを追加
```

### 要素の削除

```javascript
ul.removeChild(li); // 親要素から子要素を削除
```

### スコープに注意

`li` や `deleteBtn` はイベントリスナーの**中で作った変数**なので、外からは使えない。削除や完了の処理も同じ `{}` の中に書く。

```javascript
push.addEventListener("click", function () {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");

    // ← deleteBtn の addEventListener もここに入れる
    deleteBtn.addEventListener("click", function () {
        ul.removeChild(li); // li も同じスコープなので使える
    });
});
```

### 完了チェック（取り消し線）

```css
.done {
    text-decoration: line-through;
    color: gray;
}
```

```javascript
span.addEventListener("click", function () {
    span.classList.toggle("done");
});
```

> `li` 全体にイベントをつけると削除ボタンのクリックも拾ってしまうので `span` につける。

---

## 📝 完成コード

### index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>todo mini</title>
    <style>
        .done {
            text-decoration: line-through;
            color: gray;
        }
    </style>
</head>
<body>
    <ul id="todoList"></ul>
    <input type="text" id="inputText">
    <button id="push">追加</button>
    <script src="main.js"></script>
</body>
</html>
```

### main.js

```javascript
const inputText = document.querySelector("#inputText");
const push = document.querySelector("#push");
const ul = document.querySelector("#todoList");

push.addEventListener("click", function () {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = inputText.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    deleteBtn.addEventListener("click", function () {
        ul.removeChild(li);
    });

    span.addEventListener("click", function () {
        span.classList.toggle("done");
    });
});
```