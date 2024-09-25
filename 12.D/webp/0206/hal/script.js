function random(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
}

function atlag(tomb) {
    var sum = 0;
    tomb.forEach(element => {
        sum += element;
    });

    return (sum / tomb.length).toFixed();
}

function gToKg(gramm) {
    return gramm * 0.001;
}

var versenyzokSzama;
do {
    versenyzokSzama = prompt("Hány versenyző indult?");
} while(isNaN(parseInt(versenyzokSzama)) || versenyzokSzama > 100 || versenyzokSzama < 15);

var halakTomege = new Array(versenyzokSzama);

for (let i = 0; i < versenyzokSzama; i++) {
    halakTomege[i] = random(1500, 25000);    
}

console.log(`Halak átlagos tömege: ${atlag(halakTomege)}g.`);

var nyertes = {
    sorszama: 0,
    halSulya: 0
}

var bevetele = 0;

for (let i = 0; i < halakTomege.length; i++) {
    if(nyertes.halSulya < halakTomege[i]){
        nyertes.halSulya = halakTomege[i];
        nyertes.sorszama = i + 1;
    }    

    if(halakTomege[i] < 8000){
        bevetele += gToKg(halakTomege[i]) * 2350;
    }
}

console.log(`A legnagyobb sorszáma: ${nyertes.sorszama}, tömege ${gToKg(nyertes.halSulya)}kg.`);
console.log(`A szervező eladásokból származó bevétele: ${bevetele.toFixed()}Ft.`);