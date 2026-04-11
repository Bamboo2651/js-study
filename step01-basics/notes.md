# Step 1 - JS基礎構文

## 変数

```js
const name = "ひろや"; // 再代入不可（基本これを使う）
let score = 0;         // 再代入可
score = 100;           // OK
```

> 迷ったら `const`、再代入が必要なときだけ `let`。`var` は使わない。

---

## データ型

```js
const str     = "文字列";  // String
const num     = 42;        // Number
const flag    = true;      // Boolean
const nothing = null;      // Null（意図的な空）
const undef   = undefined; // Undefined（値がない）

typeof "hello" // "string"
typeof 42      // "number"
typeof true    // "boolean"
```

---

## 演算子

```js
// 算術
10 + 3   // 13
10 % 3   // 1（余り）
10 ** 2  // 100（べき乗）

// 比較（結果は true / false）
5 === 5   // true  ← 型も見る（これを使う）
5 == "5"  // true  ← 型を無視（使わない）
5 !== 3   // true

// 論理
true && false // false（AND）
true || false // true （OR）
!true         // false（NOT）
```

---

## 条件分岐

```js
if (score >= 90) {
  console.log("優");
} else if (score >= 70) {
  console.log("良");
} else {
  console.log("可");
}

// 三項演算子（1行で書きたいとき）
const result = score >= 70 ? "合格" : "不合格";
```

---

## ループ

```js
// for（回数が決まっているとき）
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// for...of（配列の中身を順番に取り出す）
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## 関数

```js
// アロー関数
const greet = (name) => {
  return "こんにちは、" + name + "さん！";
};

// 1行のときは短く書ける
const double = (n) => n * 2;
```

---

## スコープ

```js
const globalVar = "どこからでも見える";

const myFunc = () => {
  const localVar = "関数の中だけ";
  console.log(globalVar); // OK
  console.log(localVar);  // OK
};

myFunc();
console.log(globalVar); // OK
console.log(localVar);  // ❌ エラー
```

> `const` / `let` は `{}` の中だけに閉じる（ブロックスコープ）。

---

## 総まとめ課題（自作）

```js
const scores = [85, 42, 90, 61, 78];

const judge = (score) => {
  if (score >= 90) {
    console.log(score + "点 → 優");
  } else if (score >= 70) {
    console.log(score + "点 → 良");
  } else if (score >= 60) {
    console.log(score + "点 → 可");
  } else {
    console.log(score + "点 → 不可");
  }
};

for (const score of scores) {
  judge(score);
}
```