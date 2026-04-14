# Step 05 - Fetch API & JSON

## 学んだこと

### Fetch API とは
ブラウザに標準搭載されている、外部APIにリクエストを送る機能。
`fetch()` は Promise を返すので `await` で待てる。

---

### 基本の流れ

```js
async function main() {
  const response = await fetch("https://example.com/api/data"); // リクエスト送信
  const data = await response.json();                           // JSONとして読み込む
  console.log(data);                                            // JSオブジェクトとして使える
}
```

**なぜ await が2回必要か**
- 1回目：サーバーからレスポンスが届くまで待つ
- 2回目：bodyの読み込みが終わるまで待つ（fetchは返答が来た時点でresponseを返すが、bodyはまだ読み込み中の場合がある）

---

### response オブジェクト

| プロパティ | 意味 |
|---|---|
| `ok: true` | 通信が成功した |
| `status: 200` | HTTPステータスコード（200 = 成功） |
| `body` | データの中身（そのままでは読めない） |

---

### JSON とは
APIのやり取りで使われるデータ形式。JSのオブジェクトとほぼ同じ見た目。

```json
{
  "name": "東京",
  "temp": 20,
  "weather": "晴れ"
}
```

`response.json()` でJSオブジェクトに変換して使う。

---

### エラーハンドリング

```js
async function main() {
  try {
    const response = await fetch("https://...");
    const data = await response.json();
    document.getElementById("title").textContent = data.title;
  } catch(error) {
    document.getElementById("title").textContent = "取得に失敗しました";
    console.log("エラー：", error);
  }
}
```

fetchは通信失敗時に reject するので、Step 4 で学んだ `try/catch` でそのまま拾える。

---

### 複数データのリスト表示

```js
const response = await fetch("https://example.com/todos?_limit=5"); // ?_limit=5 で件数を絞る
const data = await response.json(); // 配列で返ってくる

const list = document.getElementById("list");

data.forEach(function(todo) {
  const li = document.createElement("li"); // li要素を作る
  li.textContent = todo.title;
  list.appendChild(li);                    // ulに追加
});
```

---

### 全体の流れまとめ

```
fetch(URL)
  → response（サーバーの返答）
  → response.json()（bodyをJSONとして読み込む）
  → data（JSオブジェクト／配列として使える）
  → DOMに表示
  → try/catch でエラーを拾う
```