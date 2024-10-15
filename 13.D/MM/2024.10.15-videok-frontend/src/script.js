const apiLink = "http://localhost:3000";

function $(elementId) {
    return document.getElementById(elementId);
}

async function getVideos() {
    try {
        const response = await fetch(apiLink + "/recipes");

        const data = await response.json();

        // console.log(data);

        data.forEach(video => {
            $("videos").innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <p class="card-text">${video.desc}</p>
                    <small><i class="fa-regular fa-clock"></i>  ${(video.seconds / 60).toFixed(1)}perc</small><br>
                    <a href="${apiLink}/videos/${video.id}" target="_blank" class="btn btn-primary">Nyers adatok</a>
                </div>
            </div>
            `;
        });
    } catch (error) {
        $("videos").innerHTML = `<h1 class="text-center">Valami hiba történt!</h1>`;
        console.error("Valami hiba történt");
    }
}

async function searchVideos() {
    
    const requestUrl = new URL(apiLink + "/recipes");

    if($("search").value || $("search").value != "") {
        requestUrl.searchParams.append("title", $("search").value)
    }
    const response = await fetch(requestUrl);
    
    if(response.status == 404) {
        $("videos").innerHTML = `<h3 class="text-center">Nincs találat!</h3>`;
        return;
    }

    if(!response.ok) {
        $("videos").innerHTML = `<h3 class="text-center">Valami hiba történt!</h3>`;
        return;
    }

    const data = await response.json();

    $("videos").innerHTML= "";

    data.forEach(video => {
        $("videos").innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${video.title}</h5>
                <p class="card-text">${video.desc}</p>
                <small><i class="fa-regular fa-clock"></i>  ${(video.seconds / 60).toFixed(1)}perc</small><br>
                <a href="${apiLink}/videos/${video.id}" target="_blank" class="btn btn-primary">Nyers adatok</a>
            </div>
        </div>
        `;
    });
}

async function uploadValues() {
    const response = await fetch(apiLink + "/recipes", {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify({
            "title" : $("title").value,
            "desc" :  $("desc").value,
            "seconds" : Number($("time").value)
        })
    });

    const data = await response.json();
    if(!response.ok) {
        alert(data.message);
    } else {
        $("time").value = $("desc").value = $("title").value = "";
        alert("Sikeres feltöltés!");
        
    }
}
