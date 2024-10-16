function $(id) {
    return document.getElementById(id);
}

function calc() {
    if($("code").value.length != 12){
        return alert("A megadott vonalkód érvénytelen!");
    }

    let checkCode = 0;
    for (let i = 0; i < $("code").value.length; i++) {
        i % 2 == 0 ? checkCode += Number($("code").value[i]) : checkCode = checkCode + (Number($("code").value[i]) * 3);
    }

    $("checkd").value = Math.ceil(checkCode / 10) * 10 - checkCode;

    $("barcode_img").src = `https://barcodeapi.org/api/13/${$("code").value}${$("checkd").value}`;
}

function clearValues() {
    $("checkd").value = ($("code").value = "");
    $("barcode_img").src = "";
}

