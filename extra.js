let tasks = [];

const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", tallenna);

function tallenna() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadButton.addEventListener("click", hae);

function hae() {
    const data = localStorage.getItem("tasks");

    if (data === null) {
        tulos.textContent = "Ei ole tallennettua tietoa vielä.";
        return;
    }

    tasks = JSON.parse(data);

    tulos.textContent = "Tehtävät ladattu!";

    taskTableBody.innerHTML = "";

    tasks.forEach(function (task) {
        const row = document.createElement("tr");
        const taskCell = document.createElement("td");
        const dateCell = document.createElement("td");

        taskCell.textContent = task.task;
        dateCell.textContent = task.date;

        row.append(taskCell, dateCell);
        taskTableBody.append(row);
    });
}