# Step 3 - 配列・オブジェクト操作

## ✅ 学習内容まとめ

### オブジェクトとは？

複数の情報をまとめて持てる入れ物。

```javascript
const user = { name: "alice", age: 17 };

user.name // → "alice"
user.age  // → 17
```

配列の中にオブジェクトを入れることもできる。

```javascript
const users = [
    { name: "alice", age: 17 },
    { name: "bob", age: 23 },
];

users[0]       // → { name: "alice", age: 17 }
users[0].name  // → "alice"
```

---

### map — 全要素を変換して新しい配列を返す

```javascript
const names = ["alice", "bob", "charlie"];

const upperNames = names.map(function(name) {
    return name.toUpperCase();
});

// → ["ALICE", "BOB", "CHARLIE"]
```

> `for` ループと同じことを短く・読みやすく書ける。

---

### filter — 条件に合う要素だけ残して新しい配列を返す

```javascript
const numbers = [3, 7, 12, 5, 20, 8];

const result = numbers.filter(function(num) {
    return num >= 10;
});

// → [12, 20]
```

> `return` に `true` を返した要素だけ残る。

---

### find — 条件に合う最初の1つを返す

```javascript
const users = [
    { name: "alice", age: 17 },
    { name: "bob", age: 23 },
    { name: "charlie", age: 15 },
];

const result = users.find(function(user) {
    return user.age >= 20;
});

// → { name: "bob", age: 23 }
```

> `filter` は配列を返すが、`find` は要素そのものを返す。

| メソッド | 返り値 |
|---|---|
| `filter` | 条件に合う**全要素の配列** |
| `find` | 条件に合う**最初の1つ** |

---

### スプレッド構文 — 配列を展開・コピーする

`...` を使って配列の中身を展開できる。

```javascript
// 2つの配列を合体
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b]; // → [1, 2, 3, 4, 5, 6]
```

配列の独立したコピーを作るときにも使う。

```javascript
// ❌ これはコピーじゃなく同じものを参照している
const copy = original;

// ✅ スプレッドで新しい配列として独立したコピー
const copy = [...original];
```

> ToDoリストなどで「リストに追加した新しい配列を作る」ときによく使うパターン。

---

### ⚠️ ハマりポイント

```javascript
// オブジェクトをそのまま textContent に入れると表示されない
fid.textContent = evenfind;        // → "[object Object]"

// プロパティを指定して表示する
fid.textContent = evenfind.name;   // → "bob"
```

```javascript
// require はブラウザでは使えない（Node.js専用）
const { use } = require("react");  // ❌ ブラウザでエラーになる
```