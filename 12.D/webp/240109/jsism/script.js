// console.log("1.feladat");

// // var fok = Number(prompt("Kérek egy szöget fokban megadva!"));
// var fok = 180;
// var radian = fok * Math.PI / 180;
// console.log("A megadott szög radiánban: " + radian);

// console.log("2.feladat");
// var maxpontszam = Number(prompt("Kérem a maximális pontszámot!\n(10-100 közötti egész szám)"));
// var elertPontszam = Number(prompt("Kérem az egyik diák által elért pontszámot:\n(0-max pontsuám közé eső szám)"));
// var helyes_e = true;

// if (maxpontszam < 10 || maxpontszam > 100) {
//     console.log("Érvénytelen maximális pontszámot addot meg!");
//     helyes_e = false;
// }

// if (elertPontszam > maxpontszam || elertPontszam < 0) {
//     console.log("Érvénytelen elért pontszám.");
//     helyes_e = false;
// }

// if (helyes_e) {
//     var százalék = elertPontszam / maxpontszam * 100;
//     console.log(`Az elért százalék: ${(százalék).toFixed(2)}%`);

//     var jegy;

//     if (százalék < 50) {
//         console.log("elégtelen");
//         jegy = 1;

//     } else if (százalék < 60) {
//         console.log("elégséges");
//         jegy = 2;

//     } else if (százalék < 70) {
//         console.log("közepes");
//         jegy = 3;

//     } else if (százalék < 80) {
//         console.log("jó");
//         jegy = 4;

//     } else {
//         console.log("kiváló");
//         jegy = 5;
//     }

// }


// console.log("3.feladat");

// var elsotag = Number(prompt("Adja meg a sorozat 1. tagját:"));
// var diff = Number(prompt("Adja meg a sorozat differenciáját:"))
// var n = Number(prompt("Hanyadik ertekre kíváncsi"));

// var osszeg = elsotag;
// var jelenlegiertek = elsotag;

// for(var i = 1; i < n; i++) {
//     jelenlegiertek += diff;
//     osszeg += jelenlegiertek;
// }

// console.log(`A számtani sorozat ${n}. tagja ${jelenlegiertek}`);
// console.log(`Az előtte lévő tagok összege: ${osszeg}`);

console.log("4. feladat");


var szam = Number(prompt("Kérek egy pozitív egész számot!"));

for(var i = szam; i > 0; i--){
    var prim = true;
    for(var j = i - 1; j > 1; j--){
        if(i % j == 0) {
            var prim = false;
            break;
        }
    }

    if(prim){
        if(szam % i == 0){
            console.log(i);
            szam /= i;
            
        }
    }
}
