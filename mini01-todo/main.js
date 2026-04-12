const inputText = document.querySelector("#inputText");
const push = document.querySelector("#push");

const ul = document.querySelector("#todoList");

push.addEventListener("click", function () {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = inputText.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);


    deleteBtn.addEventListener("click", function () {
        ul.removeChild(li)
    })
})