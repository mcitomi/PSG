// gyors dom query rövidítések
function $(elementId) {
    return document.getElementById(elementId);
}

// mindig az első ilyen nevű class-t / dom elemet adja vissza
function $tag(tagName) {
    return document.getElementsByTagName(tagName)[0];
}

function $class(className) {
    return document.getElementsByClassName(className)[0];
}

var lastTeacherId = null;

var editMode = false;

async function getTeachers() {
    try {
        const response = await fetch("/api/teachers", { // az ezen a domain-en lévő /api/teachers endpointra küld kérést
            // ezért kell hogy localhost-ról nyissuk meg az oldalt
            // https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
            signal: AbortSignal.timeout(3000)   // A fetch kérés csak 3másodpercig vár a szerverre
        });

        if (!response.ok) {
            throw new Error("Hiba:A szerver nem válaszolt megfelelően!");
        }

        const body = await response.json();
        console.log(body);

        for (const teacher of body) {
            lastTeacherId = parseInt(teacher.id);

            // az input/span poziciojat chatgpt írta
            $tag("tbody").innerHTML += `
                <tr>
                    <th scope="row">${teacher.id}</th>
                    <td><div style="position: relative;">
                        <input type="text" style="visibility: hidden; position: absolute; top: 0; left: 0;" value="${teacher.name}" id="dataInput${teacher.id}">
                        <span id="dataHolder${teacher.id}">${teacher.name}</span>
                    </div></td>
                    <td><div style="position: relative;">
                        <input type="number" style="visibility: hidden; position: absolute; top: 0; left: 0; max-width:50px" value="${teacher.age}" id="dataInput${teacher.id}age">
                        <span id="dataHolder${teacher.id}age">${teacher.age}</span>
                    </div></td>
                    <td>
                        <button id="modifyBtn${teacher.id}" type="button" class="btn btn-warning btn-sm" onclick="modifyTeacher(${teacher.id})">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button> 
                        <button id="deleteBtn${teacher.id}" type="button" class="btn btn-danger btn-sm" onclick="deleteTeacher(${teacher.id})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `;
        }

        $tag("tbody").innerHTML += `
            <tr>
                <th scope="row">x</th>
                <td><div style="position: relative;">
                        <input type="text" style="visibility: hidden; position: absolute; top: 0; left: 0;" placeholder="Kiss Béla" id="dataInput${lastTeacherId + 1}">
                        <span id="dataHolder${lastTeacherId + 1}"></span>
                </div></td>
                <td><div style="position: relative;">
                    <input type="number" style="visibility: hidden; position: absolute; top: 0; left: 0; max-width:50px" placeholder="33" id="dataInput${lastTeacherId + 1}age">
                    <span id="dataHolder${lastTeacherId + 1}age"></span>
                </div></td>
                    
                <td>
                <button type="button" id="modifyBtn${lastTeacherId + 1}" class="btn btn-warning btn-sm" onclick="modifyTeacher(${lastTeacherId + 1})"><i class="fa-regular fa-square-plus"></i></button> 
                </td>
            </tr>
        `;

    } catch (error) {
        if (error.message.includes("Hiba")) {
            $class("container").innerHTML = `
            <h1 class="text-center text-danger y-3">${error.message}</h1>
            <h3 class="text-center">Próbálja újra később</h3>
            `;
            return;
        }

        $class("container").innerHTML = `
            <h1 class="text-center text-danger y-3">Valami hiba történt!</h1>
            <h3 class="text-center">Próbálja újra később</h3>
        `;
    }
}

function modifyTeacher(teacherId) {
    // itt vált át a szöveg input-ra
    $(`dataInput${teacherId}`).style.visibility = "visible";
    $(`dataHolder${teacherId}`).style.visibility = "hidden";

    $(`dataInput${teacherId}age`).style.visibility = "visible";
    $(`dataHolder${teacherId}age`).style.visibility = "hidden";

    if (!editMode) {
        disableAllOtherButton(teacherId);
        editMode = true;
    } else {
        updateValues(teacherId);
    }
}

// "szerkesztő mód"ban a gombok ki/be kapcsolása
function disableAllOtherButton(id) {
    for (let i = 0; i <= lastTeacherId + 1; i++) {

        if (i != id) {
            try {
                $(`modifyBtn${i}`).disabled = true;
                $(`deleteBtn${i}`).disabled = true;
            } catch (e) {
                continue;
            }
        } else {
            $(`modifyBtn${i}`).innerHTML = `<i class="fa-regular fa-square-check"></i>`;
            $(`modifyBtn${i}`).classList.remove("btn-warning");
            $(`modifyBtn${i}`).classList.add("btn-success");
        }
    }
}

function enableAllOtherButton(id) {
    for (let i = 0; i <= lastTeacherId + 1; i++) {

        if (i != id) {
            try {
                $(`modifyBtn${i}`).disabled = false;
                $(`deleteBtn${i}`).disabled = false;
            } catch (e) {
                continue;
            }
        } else {
            $(`modifyBtn${i}`).innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
            $(`modifyBtn${i}`).classList.remove("btn-success");
            $(`modifyBtn${i}`).classList.add("btn-warning");
        }
    }
}

async function updateValues(id) {
    let updatedValues = {};

    updatedValues.id = id;

    if ($(`dataHolder${id}`).textContent.trim() != $(`dataInput${id}`).value.trim()) {
        updatedValues.name = $(`dataInput${id}`).value;
    }

    if ($(`dataHolder${id}age`).textContent.trim() != $(`dataInput${id}age`).value.trim()) {
        updatedValues.age = $(`dataInput${id}age`).value;
    }

    console.log(updatedValues);

    if (id > lastTeacherId) { 
        pushNewTeacher(updatedValues);
        return;
    }

    $(`dataHolder${id}`).textContent = $(`dataInput${id}`).value.trim();
    $(`dataHolder${id}age`).textContent = $(`dataInput${id}age`).value.trim();

    if (Object.keys(updatedValues).length > 1) {
        // ez fut le, ha változott valami érték

        const response = await sendValues(updatedValues);

        if (response.success) {
            editMode = false;

            $tag("tbody").innerHTML = "";

            getTeachers();
        } else {
            alert(response.message);
        }
    } else {
        // ha nem történt módosítás visszaállítódik minden
        $(`dataInput${id}`).style.visibility = "hidden";
        $(`dataHolder${id}`).style.visibility = "visible";
    
        $(`dataInput${id}age`).style.visibility = "hidden";
        $(`dataHolder${id}age`).style.visibility = "visible";

        editMode = false;
        
        enableAllOtherButton(id);
    }
}

async function sendValues(values) {
    try {
        let methodType = "PATCH";

        if (Object.keys(values).length !== 2) { // ha több értéket módosítunk (tehát az összeset) akkor put lesz
            methodType = "PUT";
        }

        console.log(`Küldve ezzel: ${methodType}`);

        const response = await fetch("/api/teachers", {
            method: methodType,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        const body = await response.json();

        if (response.status > 299) {    // ha hibakódot ad vissza (299 felett hibakódok vannak tbh)
            return {
                "success": false,
                "message": body.message
            }
        } else {
            return {
                "success": true,
                "message": body.message
            }
        }
    } catch (e) {
        return {
            "success": false,
            "message": "A szerver nem válaszolt!"
        }
    }
}

async function deleteTeacher(id) {
    if (confirm(`Biztos hogy törlöd #${id} azonosítójú tanár adatait?`)) { // felugró üzenet 
        try {
            const response = await fetch("/api/teachers", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id
                })
            });

            const body = await response.json();

            if (response.ok) {
                editMode = false;

                $tag("tbody").innerHTML = "";

                getTeachers();
            } else {
                alert(body?.message ? body?.message : "Nem sikerült törölni az adatokat!");
            }
        } catch (error) {
            console.log(error);
            
            alert("Valami hiba történt!");
            return;
        }
    }
}

async function pushNewTeacher(values) {
    try {
        const response = await fetch("/api/teachers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        const body = await response.json();

        if (response.status > 299) {
            alert(body?.message ? body?.message : "Valami hiba történt!");
            return;
        } else {
            editMode = false;

            $tag("tbody").innerHTML = "";

            getTeachers();
        }
    } catch (error) {
        console.log(error);
        
        alert("Valami hiba történt!");
        return;
    }
}