function $(id) {
    return document.getElementById(id);
}

function loginCheck() {
    if(localStorage.getItem($("user").value) == $("pass").value){
        alert(`${$("user").value} sikeresen bejelentkezett!`);
        $("user").value = $("pass").value = "";
    } else {
        alert("sikertelen bejelentkezés ");
    }
}

function register() {
    if(localStorage.getItem($("user").value)){
        alert("ilyen felhasználó már létezik!");
    } else {
        localStorage.setItem($("user").value, $("pass").value);
        alert("sikeres regisztráció!");
        $("user").value = $("pass").value = "";
    }
}

function changePassType() {
    if($("pass").type == "password"){
        $("pass").type = "text";
    } else {
        $("pass").type = "password";
    }
}