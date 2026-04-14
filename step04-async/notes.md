# Step 04 - 非同期処理

## 非同期処理とは

JavaScriptは基本的に1行ずつ順番に実行される。  
ただし**時間がかかる処理**（API取得など）があると、それを待っている間に画面が固まってしまう。

→ 「**待ってる間も他のことができるようにする**」のが非同期処理の目的。

---

## setTimeout

「〇秒後に実行」を予約する。

```js
console.log("1番目");

setTimeout(function() {
  console.log("2番目（1秒後）");
}, 1000);

console.log("3番目");

// 出力順：1番目 → 3番目 → 2番目
```

`setTimeout` に出会った瞬間、JSは「1秒後にやっておくね」と予約だけして次の行へ進む。

---

## Promise

「**今すぐ結果は出ないけど、終わったら教えるよ**」という約束オブジェクト。  
引換券のイメージ。

```js
function データを取得する() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (成功する) {
        resolve("取得成功！"); // 成功を通知
      } else {
        reject("取得失敗..."); // 失敗を通知
      }
    }, 1000);
  });
}
```

### resolve / reject

| | 役割 | 補足 |
|---|---|---|
| `resolve` | 成功を通知する | 1番目の引数 |
| `reject` | 失敗を通知する | 2番目の引数 |

- 名前は慣習で何でもいい（1番目を呼べば成功、2番目を呼べば失敗）
- `resolve` が呼ばれるまでPromiseは永遠に待ち続ける

---

## async / await

Promiseを**上から順番に読める形**で書くための構文。

| キーワード | どこに書く | 意味 |
|-----------|-----------|------|
| `async` | 関数の前 | 「この関数はPromiseを返すよ」という宣言 |
| `await` | 関数の中 | 「ここで次の行に進まない」という命令 |

- `await` は `async` の中でしか使えない
- `await` で止まるのは `async` 関数の中だけ（外は待たない）

```js
async function main() {
  console.log("取得中...");
  const result = await データを取得する(); // 結果が来るまで次に進まない
  console.log(result);
}

main();
console.log("こっちは先に出る"); // mainの外なので待たない
```

---

## try / catch

`await` + `reject` の組み合わせでエラーを拾う。

```js
async function main() {
  try {
    const result = await データを取得する(false);
    console.log(result); // rejectされるとここには来ない
  } catch(error) {
    console.log("エラー：", error); // rejectされるとここに来る
  }
}
```

### 仕組み

| | awaitの動き | tryの動き |
|---|---|---|
| `resolve` | 値を返す | 続きを実行 |
| `reject` | 例外を投げる | 中断してcatchへジャンプ |

### try/catchが必要な理由

- `fetch` などの外部ライブラリは内部で勝手に `reject` を投げてくる
- 自分で書いていないコードのエラーも `catch` で拾える
- → Step 5以降で実際に使う

---

## まとめ

```
時間がかかる処理
  → Promise で「終わったら教える」仕組みを作る
  → async/await で読みやすく書く
  → try/catch でエラーを拾う
```