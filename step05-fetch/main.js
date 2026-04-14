async function main() {
    console.log("取得中---");
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response)
}
main();