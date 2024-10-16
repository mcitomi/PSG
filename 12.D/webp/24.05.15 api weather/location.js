function $(id) {
    return document.getElementById(id);
}

async function getCityInfo(cityName) {
    return (await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURI(cityName)}&count=15&language=en&format=json`)).json()).results.filter(x => x.country_code == "HU")[0];
}

async function search() {
    const cityValues = await getCityInfo($("city").value);
    window.location.replace(`${window.location.href.slice(0, window.location.href.lastIndexOf('/'))}/weather.html?lat=${await cityValues.latitude}&lon=${await cityValues.longitude}&c=${await cityValues.name}`);
}
