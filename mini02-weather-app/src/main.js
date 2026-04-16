const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');

button.addEventListener('click', () => {
    const city = input.value;
    console.log('検索する都市:', city);
});