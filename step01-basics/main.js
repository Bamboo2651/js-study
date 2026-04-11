const score = 85;

if (score >= 90) {
  console.log("優");
} else if (score >= 70) {
  console.log("良");
} else {
  console.log("可");
}

const result = score >= 70 ? "合格" : "不合格";
console.log(result);