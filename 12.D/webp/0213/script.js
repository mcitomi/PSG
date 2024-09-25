let napontaKitermelt;
do {
    napontaKitermelt = Number(prompt("Mennyi fát teremelnek ki egy nap?"));
} while (isNaN(napontaKitermelt) || napontaKitermelt < 35 || napontaKitermelt > 55);

let kitermeltFak = new Array(14);

for (let i = 0; i < kitermeltFak.length; i++) {
    let egyNapKitermelt = new Array(napontaKitermelt);

    for (let j = 0; j < napontaKitermelt; j++) {
        egyNapKitermelt[j] = random(150, 300);
    }
    kitermeltFak.push(egyNapKitermelt);
}

for (let i = 0; i < kitermeltFak.length; i++) {
    let osszeg = 0;
    for (let j = 0; j < napontaKitermelt; j++) {
        osszeg += kitermeltFak[i][j];
    }
    let atlag = osszeg / napontaKitermelt;
    console.log();

}

function random(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
}

function cmAtvaltas(cm) {
    return cm / 100;
}