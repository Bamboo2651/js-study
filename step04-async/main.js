// console.log("1番目")
// setTimeout(function () {
//     console.log("2番目(1秒後)");
// }, 1000);
// console.log("3番目")

// function データを取得する() {
//   setTimeout(function() {
//     return "取得したデータ";
//   }, 1000);
// }

// const result = データを取得する();
// console.log(result); // 何が表示される？


function データを取得する() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("取得したデータ"); // 「終わったよ！」と通知
    }, 1000);
  });
}

データを取得する().then(function(result) {
  console.log(result); // 終わったら呼ばれる
});

console.log("取得中...");