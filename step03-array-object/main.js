// map
const names = ["alice", "bob", "charlie"];
const doubled = names.map(function (num) {
    return num.toUpperCase()
})
const p = document.querySelector("p");
p.textContent=doubled