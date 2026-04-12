// ① 要素を取得する
const message = document.querySelector("#message");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
    message.textContent("さようなら")
})