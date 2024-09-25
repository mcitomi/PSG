var ar = 1350, input = "", feltetek = 0;
var kat1 = ["sonka", "gomba", "kukorica"];
var kat2 = ["kolbász", "ananász", "jalapenho"];
var kat3 = ["kagyló", "articsóka", "olíva"];

console.log("Üdvözli Önt a MixAPizza pizzéria!");

while (input != "-" && feltetek < 5) {
    input = prompt("Írja be a feltét nevét:");

    if(kat1.includes(input)){
        feltetek++;
        ar += 200;
    } else if(kat2.includes(input)){
        feltetek++;
        ar += 250;
    } else if(kat3.includes(input)){
        feltetek++;
        ar += 300;

    } else if(input == "-"){
        break;
        
    } else {
        alert("A megadott feltét hibás!");
    }
}

console.log(`A pizzára ${feltetek}db feltét került és ${ar}Forintba kerül.`);
