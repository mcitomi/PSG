document.addEventListener('DOMContentLoaded', () => {
    window.showSection = function(sectionId) {
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
    }

    let cars = [];

    function renderCars() {
        let carList = document.getElementById('carList');
        carList.innerHTML = "";

        cars.forEach((car, index) => {
            let div = document.createElement('div');
            div.className = 'car';
            div.innerHTML = `
                ${car.marka} - ${car.motor} - ${car.loero} LE - ${car.uzemanyag}
                <button onclick="editCar(${index})">Szerkesztés</button>
                <button onclick="deleteCar(${index})">Törlés</button>
            `;
            carList.appendChild(div);
        });
    }

    document.getElementById('registerForm').addEventListener("submit", function(e){
        e.preventDefault();

        let marka = document.getElementById('marka').value.trim();
        let motor = document.getElementById('motor').value.trim();
        let loero = document.getElementById('loero').value;
        let uzemanyag = document.getElementById('uzemanyag').value;
        let msg = document.getElementById('registerMessage');

        if(!marka || !motor || !loero || !uzemanyag){
            msg.textContent = "Minden mezőt ki kell töltened, hogy regisztráld az autódat";
            msg.className = "error";
        } else{
            
            cars.push({ marka, motor, loero, uzemanyag });
            renderCars();

            msg.textContent = "Sikeresen regisztráltad az autódat!";
            msg.className = "success";

            
            document.getElementById('registerForm').reset();
        }
    });

    window.editCar = function(index) {
        let car = cars[index];

        let marka = prompt("Márka:", car.marka);
        let motor = prompt("Motortípus:", car.motor);
        let loero = prompt("Lóerő:", car.loero);
        let uzemanyag = prompt("Üzemanyag:", car.uzemanyag);

        if (marka && motor && loero && uzemanyag) 
            {
            cars[index] = { marka, motor, loero, uzemanyag };
            renderCars();
        }
    }

    window.deleteCar = function(index) {
        cars.splice(index, 1);
        renderCars();
    }

    let tasks = [];

    function renderTasks() {
        let taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            let div = document.createElement('div');
            div.className = 'task';
            div.innerHTML = `
                ${task}
                <button onclick="editTask(${index})"> Szerkesztés</button>
                <button onclick="deleteTask(${index})"> Törlés</button>
            `;
            taskList.appendChild(div);
        });
    }

    window.addTask = function() {
        let input = document.getElementById("taskInput");
        if(input.value.trim() !== "") {
            tasks.push(input.value.trim());
            input.value = "";
            renderTasks();
        }
    }

    window.editTask = function(index) {
        let newTask = prompt("Új feladat szövege: ", tasks[index]);
        if(newTask) {
            tasks[index] = newTask.trim();
            renderTasks();
        }
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1); 
        renderTasks();
    }
});
