// ① 要素を取得する
const message = document.querySelector("#message");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
    message.textContent = "さようなら"
})

const inputText = document.querySelector("#inputText");
const outText = document.querySelector("#outText");
inputText.addEventListener("input", function () {
    outText.textContent = inputText.value
})


const colorbtn = document.querySelector("#colorbtn");
colorbtn.addEventListener("click", function () {
    message.classList.toggle("red");
})