async function main() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();

        document.getElementById("title").textContent = data.title;
        document.getElementById("status").textContent = data.completed ? "完了" : "未完了";
    } catch (error) {
        document.getElementById("title").textContent = "取得に失敗しました";
        console.log("エラー：", error);
    }
}

main();