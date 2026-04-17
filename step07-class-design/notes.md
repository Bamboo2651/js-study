# JavaScript の `class` 完全ガイド（初心者向け）

## 目次

- [JavaScript の `class` 完全ガイド（初心者向け）](#javascript-の-class-完全ガイド初心者向け)
  - [目次](#目次)
  - [1. classとは何か？](#1-classとは何か)
  - [2. 基本的な書き方](#2-基本的な書き方)
  - [3. constructor（コンストラクター）](#3-constructorコンストラクター)
  - [4. プロパティとメソッド](#4-プロパティとメソッド)
  - [5. 継承（extends）](#5-継承extends)
  - [6. static（静的メソッド・プロパティ）](#6-static静的メソッドプロパティ)
  - [7. getter / setter](#7-getter--setter)
  - [8. privateフィールド（#）](#8-privateフィールド)
  - [9. 実践的な使用例](#9-実践的な使用例)
    - [ショッピングカート](#ショッピングカート)
  - [10. よくある間違い](#10-よくある間違い)
    - [❌ `new` を忘れる](#-new-を忘れる)
    - [❌ 子クラスで `super()` を忘れる](#-子クラスで-super-を忘れる)
    - [❌ メソッドの定義に `function` をつける](#-メソッドの定義に-function-をつける)
    - [❌ `this` の紛失（コールバックで注意）](#-this-の紛失コールバックで注意)
  - [まとめ](#まとめ)

---

## 1. classとは何か？

`class`（クラス）とは、**オブジェクトの設計図**のようなものです。

たとえば「犬」というクラスを作れば、そこから「ポチ」「ハナ」「タロウ」など、共通の特徴を持つ複数のオブジェクトを簡単に作れます。

```
クラス（設計図）          インスタンス（実体）
┌──────────────┐         ┌──────────┐
│    Dog       │ ──→     │ ポチ     │ 名前: ポチ, 年齢: 3
│  名前        │ ──→     │ ハナ     │ 名前: ハナ, 年齢: 5
│  年齢        │ ──→     │ タロウ   │ 名前: タロウ, 年齢: 1
│  吠える()    │
└──────────────┘
```

---

## 2. 基本的な書き方

```javascript
class クラス名 {
  // ここにプロパティやメソッドを書く
}
```

**具体例：**

```javascript
class Dog {
  // 内容は後で追加します
}

// new キーワードでインスタンス（実体）を作成
const pochi = new Dog();
console.log(pochi); // Dog {}
```

> 📌 **ポイント**：クラス名は大文字で始めるのが慣習です（例：`Dog`, `User`, `ShoppingCart`）

---

## 3. constructor（コンストラクター）

`constructor` は、`new` でインスタンスを作ったときに**自動的に呼ばれる特別なメソッド**です。
初期値の設定に使います。

```javascript
class Dog {
  constructor(name, age) {
    this.name = name; // this.name にインスタンスの名前を保存
    this.age = age;   // this.age にインスタンスの年齢を保存
  }
}

const pochi = new Dog("ポチ", 3);
console.log(pochi.name); // "ポチ"
console.log(pochi.age);  // 3

const hana = new Dog("ハナ", 5);
console.log(hana.name);  // "ハナ"
```

> 📌 **`this` とは？**：`this` は「このインスタンス自身」を指します。`this.name` は「このオブジェクトの name プロパティ」という意味です。

---

## 4. プロパティとメソッド

**プロパティ** = オブジェクトが持つデータ（変数）
**メソッド** = オブジェクトが持つ機能（関数）

```javascript
class Dog {
  constructor(name, age) {
    this.name = name; // プロパティ
    this.age = age;   // プロパティ
  }

  // メソッド（関数）を定義
  bark() {
    console.log(`${this.name}：ワンワン！`);
  }

  introduce() {
    console.log(`私は${this.name}、${this.age}歳です。`);
  }
}

const pochi = new Dog("ポチ", 3);
pochi.bark();       // "ポチ：ワンワン！"
pochi.introduce();  // "私はポチ、3歳です。"
```

---

## 5. 継承（extends）

`extends` を使うと、**既存のクラスを引き継いで新しいクラスを作れます**。
これを「継承」といいます。

```javascript
// 親クラス（基底クラス）
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name}がご飯を食べています。`);
  }
}

// 子クラス（派生クラス）- Animal を継承
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 親クラスの constructor を呼ぶ（必須！）
    this.breed = breed; // 犬種を追加
  }

  bark() {
    console.log(`${this.name}（${this.breed}）：ワンワン！`);
  }
}

class Cat extends Animal {
  meow() {
    console.log(`${this.name}：ニャー！`);
  }
}

const pochi = new Dog("ポチ", "柴犬");
pochi.eat();  // "ポチがご飯を食べています。"（Animal から引き継ぎ）
pochi.bark(); // "ポチ（柴犬）：ワンワン！"

const tama = new Cat("タマ");
tama.eat();   // "タマがご飯を食べています。"（Animal から引き継ぎ）
tama.meow();  // "タマ：ニャー！"
```

> 📌 **`super()`**：子クラスの `constructor` 内で親クラスの `constructor` を呼ぶために使います。`extends` を使う場合は必ず `this` を使う前に `super()` を呼ぶ必要があります。

---

## 6. static（静的メソッド・プロパティ）

`static` をつけると、**インスタンスを作らなくても直接クラスから呼び出せる**メソッドやプロパティになります。

```javascript
class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// インスタンスを作らずに使える
console.log(MathHelper.PI);           // 3.14159
console.log(MathHelper.add(3, 5));    // 8
console.log(MathHelper.multiply(4, 6)); // 24

// ❌ インスタンスからは呼べない
const helper = new MathHelper();
// helper.add(1, 2); // エラー！
```

**static の使いどころ：**

- ユーティリティ（便利な計算・変換など）
- インスタンス数のカウント
- ファクトリーメソッド（インスタンスを作る処理）

---

## 7. getter / setter

`get` と `set` を使うと、プロパティのように見えるメソッドを定義できます。

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  // getter: 円の面積を計算して返す
  get area() {
    return Math.PI * this.radius ** 2;
  }

  // getter: 円の直径を返す
  get diameter() {
    return this.radius * 2;
  }

  // setter: 直径から半径を設定できる
  set diameter(value) {
    this.radius = value / 2;
  }
}

const circle = new Circle(5);

// メソッドなのに () なしで呼べる！
console.log(circle.area);     // 78.539...（計算された値）
console.log(circle.diameter); // 10

// setter で設定
circle.diameter = 20;
console.log(circle.radius);   // 10（自動で半径が更新される）
```

---

## 8. privateフィールド（#）

`#` を先頭につけると、**クラスの外からアクセスできないプロパティ**になります（プライベートフィールド）。

```javascript
class BankAccount {
  #balance = 0; // プライベートフィールド（外から直接変更不可）

  constructor(initialAmount) {
    this.#balance = initialAmount;
  }

  // 残高を確認（読み取りのみ）
  get balance() {
    return this.#balance;
  }

  // 入金
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`${amount}円を入金しました。残高：${this.#balance}円`);
    }
  }

  // 出金
  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("残高が不足しています。");
      return;
    }
    this.#balance -= amount;
    console.log(`${amount}円を出金しました。残高：${this.#balance}円`);
  }
}

const account = new BankAccount(1000);
account.deposit(500);   // "500円を入金しました。残高：1500円"
account.withdraw(200);  // "200円を出金しました。残高：1300円"
console.log(account.balance); // 1300

// ❌ 外からは直接アクセスできない
// account.#balance = 999999; // エラー！
```

---

## 9. 実践的な使用例

### ショッピングカート

```javascript
class ShoppingCart {
  #items = [];

  // 商品を追加
  addItem(name, price, quantity = 1) {
    this.#items.push({ name, price, quantity });
    console.log(`「${name}」を${quantity}個追加しました。`);
  }

  // 商品を削除
  removeItem(name) {
    this.#items = this.#items.filter(item => item.name !== name);
    console.log(`「${name}」を削除しました。`);
  }

  // 合計金額を計算
  get total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // カートの中身を表示
  showItems() {
    if (this.#items.length === 0) {
      console.log("カートは空です。");
      return;
    }
    console.log("=== カートの中身 ===");
    this.#items.forEach(item => {
      console.log(`・${item.name}：${item.price}円 × ${item.quantity}個`);
    });
    console.log(`合計：${this.total}円`);
  }
}

const cart = new ShoppingCart();
cart.addItem("りんご", 150, 3);
cart.addItem("バナナ", 80, 2);
cart.addItem("オレンジ", 120);
cart.showItems();
// === カートの中身 ===
// ・りんご：150円 × 3個
// ・バナナ：80円 × 2個
// ・オレンジ：120円 × 1個
// 合計：730円

cart.removeItem("バナナ");
cart.showItems();
```

---

## 10. よくある間違い

### ❌ `new` を忘れる

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const pochi = Dog("ポチ"); // ❌ エラー！new が必要
const pochi = new Dog("ポチ"); // ✅ 正しい
```

### ❌ 子クラスで `super()` を忘れる

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // super(name); を忘れると...
    this.breed = breed; // ❌ エラー！super() より前に this は使えない
  }
}
```

### ❌ メソッドの定義に `function` をつける

```javascript
class Dog {
  // ❌ function キーワードは不要
  function bark() {
    console.log("ワン！");
  }

  // ✅ 正しい
  bark() {
    console.log("ワン！");
  }
}
```

### ❌ `this` の紛失（コールバックで注意）

```javascript
class Timer {
  constructor() {
    this.count = 0;
  }

  start() {
    // ❌ 通常の関数では this が変わってしまう
    setInterval(function() {
      this.count++; // this が Timer を指さない！
    }, 1000);

    // ✅ アロー関数を使うと this が正しく引き継がれる
    setInterval(() => {
      this.count++; // this が Timer を指す
    }, 1000);
  }
}
```

---

## まとめ

| 機能 | 書き方 | 説明 |
|------|--------|------|
| クラス定義 | `class Name {}` | 設計図を作る |
| インスタンス生成 | `new Name()` | 実体を作る |
| 初期化 | `constructor()` | new 時に自動実行 |
| メソッド | `methodName() {}` | クラス内の関数 |
| 継承 | `extends` | 別クラスを引き継ぐ |
| 親の呼び出し | `super()` | 親クラスのメソッドを呼ぶ |
| 静的メンバー | `static` | インスタンス不要で使える |
| ゲッター | `get prop() {}` | 読み取り専用プロパティ風 |
| セッター | `set prop(v) {}` | 書き込み時の処理 |
| プライベート | `#field` | 外部からアクセス不可 |

classをマスターすると、コードが整理しやすくなり、大きなアプリケーションも作りやすくなります。まずは簡単なクラスを自分で書いてみましょう！ 🚀