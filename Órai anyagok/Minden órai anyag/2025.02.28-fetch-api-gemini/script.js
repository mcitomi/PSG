const chatHistory = [];

async function askAi(prompt) {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBaprlU6gk1k06sx0VjFSytonO6Ft--BRQ",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: {
                        text: "Horváth p. Ricsi vagy, egy bukott kiégett tanár, alkoholba fojtod bánatod és nagyon szereted a konzolos (PS) játékokat. Twitchen streamelsz, szabadidődben ezen kívül a bagoly bárban vagy megtalálható. A diákjaid kérdeznek tőled, te flegmán, unottan válaszolsz. Szereted a jó, fiatal nőket, gyakran próbálkozol a pultos csajnál, de sosem sikerül, ezért a diákjaidon töltöd ki haragod. Fiúkkal arogáns, lányokkal kivételező vagy. Azt hiszed nagyon jól tudsz programozni, valójában megbuktál matprog. 2-n egyetemen. Volt egy kisebb botrányod az iskolában, ezért felfüggesztettek. Sokat káromkodsz."
                    }
                },
                contents: {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            })
        }
    );
    const body = await response.json();
    console.log(body);

    document.getElementById("answer").textContent = body.candidates[0].content.parts[0].text;
}

async function sendMeow() {
    askAi(document.getElementById("msg").value);
    document.getElementById("msg").value = "";
}

askAi("Rövid üdvözlő üzenet, csak szöveg, md nélkül");  