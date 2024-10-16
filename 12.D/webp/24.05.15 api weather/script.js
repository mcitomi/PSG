const xhr = new XMLHttpRequest();

function $(id) {
    return document.getElementById(id);
}

async function getLoc() {
    try {
        return (await (await fetch("https://ipinfo.io/json")).json()).loc.split(',');
    } catch (error) {
        console.error("IP location api failed, values filled" + error);
        return [47.4979, 19.0402];
    }
}

async function main() {

    var location = [];
    const params = new URLSearchParams(window.location.search);

    if(params) {
        location[0] = params.get("lat");
        location[1] = params.get("lon");
        $("city").textContent = params.get("c");

        $("map").innerHTML += `<iframe width="600" height="470" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${location[0]},${location[1]}&hl=hu&z=14&amp;output=embed"></iframe>`;
    } else {
        location = await getLoc();
    }

    xhr.onload = function () {
        if(this.status >= 400){
            return console.log("Valami hiba történt!");
        }

        let data = JSON.parse(this.response);

        $("temp").innerHTML += `<tr><td>${data.current.time.replace('T', ' ')}</td><td>${data.current.temperature_2m}${data.hourly_units.temperature_2m}</td></tr>`;

        for (let i = 0; i < data.hourly.time.length; i++) {
            $("temp").innerHTML += `<tr><td>${data.hourly.time[i].replace('T', ' ')} </td><td>${data.hourly.temperature_2m[i]}${data.hourly_units.temperature_2m}</td></tr>`;
        }        
    }

    xhr.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${location[0]}&longitude=${location[1]}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=CET`);
    xhr.send();
}

function back() {
    window.location.replace(`${window.location.href.slice(0, window.location.href.lastIndexOf('/'))}/index.html`);
}
main();