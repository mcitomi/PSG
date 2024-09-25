document.addEventListener('keydown', function (a) {
    options(a.key);
}, false);

const accepted_methods = ['1','2','3','4','5','6','7','8','9','0','/','*','-','+','(',')','.','**'];

function options(key) {
    console.log(key);
    if(document.getElementById("inputbox").value == "" && (key == "0" || key == ".")) {
        return;
    };
    if(accepted_methods.includes(key)){
        document.getElementById("inputbox").value += String(key);
    } else if(key == "=" || key == "Enter"){
        calc(document.getElementById("inputbox").value);
    } else if(key == "Backspace" || key == "tör"){
        document.getElementById("inputbox").value = (document.getElementById("inputbox").value).slice(0,-1);
    }
}

function calc(value) {
    const sum = eval(value);
    if(sum == Infinity){
        document.getElementById("inputbox").value = "Hiba"; 
    } else {
        document.getElementById("inputbox").value = sum; 
    }
       
    console.log(eval(value));
}

function buttonClick(t) {
    options(t.textContent);
}