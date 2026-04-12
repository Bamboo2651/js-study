// map
const names = ["alice", "bob", "charlie"];
const doubled = names.map(function (num) {
    return num.toUpperCase()
})
const p = document.querySelector("p");
p.textContent = doubled


// filter
const numbers = [3, 7, 12, 5, 20, 8];
const evens = numbers.filter(function(num) {
    return num >= 10;
});
const filter = document.querySelector("#filter");
filter.textContent = evens


// find
const users = [
    { name: "alice", age: 17 },
    { name: "bob", age: 23 },
    { name: "charlie", age: 15 },
];
const evenfind = users.find(function(num) {
    return num.age >= 20;
});
const fid = document.querySelector("#find");
fid.textContent = evenfind.name + " " + evenfind.age; // → "bob 23"

