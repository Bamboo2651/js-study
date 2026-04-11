const scores = [85, 42, 90, 61, 78]

const myFunc = (score) => {
    if (score >= 90) {
        console.log(score + "点 → 優");
    } else if (score >= 70) {
        console.log(score + "点 → 良");
    } else if (score >= 60) {
        console.log(score + "点 → 可");
    } else {
        console.log(score + "点 → 不可");
    }
}


for (let score of scores) {
    myFunc(score)
}