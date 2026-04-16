const input = document.getElementById('cityInput');
const button = document.getElementById('searchBtn');
const result = document.getElementById('result');

//天気コード → 絵文字に変換
function getWeatherEmoji(code) {
    if (code === 0) return '☀️ 快晴';
    if (code <= 2) return '🌤 晴れ時々曇り';
    if (code <= 3) return '☁️ 曇り';
    if (code <= 48) return '🌫 霧';
    if (code <= 67) return '🌧 雨';
    if (code <= 77) return '🌨 雪';
    if (code <= 82) return '🌦 にわか雨';
    return '⛈ 嵐';
}

button.addEventListener('click', async () => {
    const city = input.value.trim();

    //入力欄が空のとき
    if (city === '') {
        result.innerHTML = '<p>都市名を入力してください。</p>';
        return;
    }

    //都市名 → 緯度・経度
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    //都市が見つからないとき
    if (!geoData.results || geoData.results.length === 0) {
        result.innerHTML = '<p>都市が見つかりませんでした。</p>';
        return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const cityName = geoData.results[0].name;

    //緯度・経度 → 天気データ
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temp = weatherData.current.temperature_2m;
    const code = weatherData.current.weathercode;
    const wind = weatherData.current.windspeed_10m;

    // ③ 画面に表示
    result.innerHTML = `
    <h2>${cityName}</h2>
    <p>${getWeatherEmoji(code)}</p>
    <p>気温：${temp}°C</p>
    <p>風速：${wind} km/h</p>
    `;
});