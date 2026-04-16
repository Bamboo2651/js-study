const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');

button.addEventListener('click', async () => {
    const city = input.value;

    //都市名 → 緯度・経度
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    console.log(geoData);
    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    console.log('緯度:', lat, '経度:', lon);

    //緯度・経度 → 天気データ
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    console.log(weatherData);
});