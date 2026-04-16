const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');

button.addEventListener('click', async () => {
    const city = input.value;
    console.log('検索する都市:', city);

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    console.log(geoData)
});