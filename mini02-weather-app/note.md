# main.js 解説ノート

> ミニ成果物② 天気アプリ（Open-Meteo API連携）

---

## 完成コード全体

```js
const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');
const result = document.getElementById('result');

function getWeatherEmoji(code) {
  if (code === 0) return '☀️ 快晴';
  if (code <= 2) return '🌤 晴れ時々曇り';
  if (code <= 3) return '☁️ 曇り';
  if (code <= 48) return '🌫 霧';
  if (code <= 67) return '🌧 雨';
  if (code <= 77) return '🌨 雪';
  if (code <= 82) return '🌦 にわか雨';
  return '⛈ 嵐';
}

button.addEventListener('click', async () => {
  const city = input.value.trim();

  if (city === '') {
    result.innerHTML = '<p>都市名を入力してください。</p>';
    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    result.innerHTML = '<p>都市が見つかりませんでした。</p>';
    return;
  }

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  const cityName = geoData.results[0].name;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const temp = weatherData.current.temperature_2m;
  const code = weatherData.current.weathercode;
  const wind = weatherData.current.windspeed_10m;

  result.innerHTML = `
    <h2>${cityName}</h2>
    <p>${getWeatherEmoji(code)}</p>
    <p>気温：${temp}°C</p>
    <p>風速：${wind} km/h</p>
  `;
});
```

---

## 1. DOM要素の取得

```js
const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');
const result = document.getElementById('result');
```

`document.getElementById('id名')` でHTMLの要素をJSから操作できるようにする。  
`input` は入力欄、`button` は検索ボタン、`result` は結果を表示するdiv。  
最初にまとめて取得しておくことで、後から何度でも使い回せる。

---

## 2. 天気コードを絵文字に変換する関数

```js
function getWeatherEmoji(code) {
  if (code === 0) return '☀️ 快晴';
  if (code <= 2) return '🌤 晴れ時々曇り';
  if (code <= 3) return '☁️ 曇り';
  if (code <= 48) return '🌫 霧';
  if (code <= 67) return '🌧 雨';
  if (code <= 77) return '🌨 雪';
  if (code <= 82) return '🌦 にわか雨';
  return '⛈ 嵐';
}
```

Open-MeteoのAPIは天気を数字（weathercode）で返してくる。  
例えば `0` は快晴、`61〜67` は雨、という具合に決まっている（WMOコードという国際規格）。  

`if (code <= 67)` のように上から順番に条件を書いているので、  
`code === 3` のとき、上の `if (code <= 2)` には引っかからず `if (code <= 3)` に引っかかる。  
この「上から順に判定する」仕組みを利用して、範囲チェックをシンプルに書いている。

最後の `return '⛈ 嵐'` はどの条件にも当てはまらなかったときの**デフォルト値**。

---

## 3. ボタンのクリックイベント

```js
button.addEventListener('click', async () => {
```

`addEventListener('click', ...)` でボタンが押されたときに実行する処理を登録する。  
**`async`** をつけることで、この関数の中で `await` が使えるようになる。  
`async` がないと `await` はエラーになる。

---

## 4. 入力値の取得とトリム

```js
const city = input.value.trim();
```

`input.value` で入力欄に入っている文字列を取得する。  
`.trim()` は文字列の**前後の空白を取り除く**メソッド。  
「　Tokyo　」のようにスペースが入っていても `"Tokyo"` に変換してくれる。

---

## 5. 空入力のチェック

```js
if (city === '') {
  result.innerHTML = '<p>都市名を入力してください。</p>';
  return;
}
```

`trim()` した後に空文字 `''` かどうかを確認する。  
空だった場合はエラーメッセージを表示して `return` で処理を止める。  
`return` がないと空のまま後続の処理（API呼び出し）が実行されてエラーになる。

---

## 6. Geocoding APIのURL組み立てとfetch

```js
const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`;
const geoRes = await fetch(geoUrl);
const geoData = await geoRes.json();
```

### URLについて
テンプレートリテラル（バッククォート）を使って `${city}` を埋め込んでいる。  
URLの `?` 以降はクエリパラメータと呼ばれ、APIへの条件指定。

| パラメータ | 意味 |
|---|---|
| `name=${city}` | 検索する都市名 |
| `count=1` | 結果を1件だけ返す |
| `language=ja` | 地名を日本語で返す |

### fetchについて
`fetch(url)` でAPIにHTTPリクエストを送る。  
`await` をつけることで**レスポンスが返ってくるまで待つ**。  
`await` なしだと待たずに次の行へ進んでしまい、データが取れていない状態で処理が続く。

`geoRes` はレスポンスオブジェクト（生のデータ）。  
`.json()` でJSON文字列をJSのオブジェクトに変換する。これも非同期なので `await` が必要。

---

## 7. 都市が見つからない場合のチェック

```js
if (!geoData.results || geoData.results.length === 0) {
  result.innerHTML = '<p>都市が見つかりませんでした。</p>';
  return;
}
```

存在しない都市名を入力したとき、APIは `results` を返さないか空配列で返してくる。  

`!geoData.results` → `results` プロパティ自体が存在しない場合  
`geoData.results.length === 0` → `results` はあるけど中身が空の場合  

`||`（OR）でどちらかに当てはまればエラー表示して `return` で止める。  
このチェックをしないと次の行で `geoData.results[0].latitude` を読もうとして  
`Cannot read properties of undefined` エラーになる。

---

## 8. 緯度・経度・都市名の取り出し

```js
const lat = geoData.results[0].latitude;
const lon = geoData.results[0].longitude;
const cityName = geoData.results[0].name;
```

`geoData.results` は配列なので `[0]` で最初の要素を取り出す。  
（`count=1` を指定しているので要素は1つだけ）  
その中の `latitude`・`longitude`・`name` プロパティを取り出して変数に入れる。

---

## 9. Forecast APIのURL組み立てとfetch

```js
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m`;
const weatherRes = await fetch(weatherUrl);
const weatherData = await weatherRes.json();
```

今度は天気予報APIに緯度・経度を渡してリクエストする。  
`current=` に取得したい項目をカンマ区切りで指定する。

| パラメータ | 意味 |
|---|---|
| `temperature_2m` | 地上2mの気温（°C） |
| `weathercode` | 天気コード（WMOコード） |
| `windspeed_10m` | 地上10mの風速（km/h） |

Geocoding APIと同じく `fetch` → `await` → `.json()` の流れ。  
これがStep4で学んだ「async/awaitを複数回使うパターン」の実践。

---

## 10. 天気データの取り出し

```js
const temp = weatherData.current.temperature_2m;
const code = weatherData.current.weathercode;
const wind = weatherData.current.windspeed_10m;
```

レスポンスの構造は `weatherData.current.{項目名}` になっている。  
`current` は「現在の天気」を表すオブジェクトで、その中に各項目が入っている。

---

## 11. 画面への表示

```js
result.innerHTML = `
  <h2>${cityName}</h2>
  <p>${getWeatherEmoji(code)}</p>
  <p>気温：${temp}°C</p>
  <p>風速：${wind} km/h</p>
`;
```

`innerHTML` にHTML文字列を代入することで、`result` の中身を書き換える。  
テンプレートリテラルで変数を埋め込んでいる。  
`getWeatherEmoji(code)` を呼び出して、天気コードを絵文字に変換した結果を表示する。

---

## 全体の流れまとめ

```
ボタンクリック
  ↓
① 入力値を取得・バリデーション
  ↓
② Geocoding API（都市名 → 緯度・経度）
  ↓
③ 都市が見つからない場合のバリデーション
  ↓
④ Forecast API（緯度・経度 → 天気データ）
  ↓
⑤ 画面に表示
```

### 今回使った主な概念

| 概念 | 使った場所 |
|---|---|
| `async / await` | APIを叩く非同期処理 |
| `fetch` | HTTPリクエストの送信 |
| `.json()` | レスポンスをオブジェクトに変換 |
| テンプレートリテラル | URLや表示HTMLの組み立て |
| 配列の `[0]` | レスポンスの最初の要素を取得 |
| `return` による早期脱出 | バリデーション後の処理中断 |
| `innerHTML` | 動的なHTML書き換え |