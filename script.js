const todoForm = document.querySelector("#todoForm");
const todoTask = document.querySelector("#todoTask");
const todoDate = document.querySelector("#todoDate");
const taskTableBody = document.querySelector("#taskTableBody");
const errorMessage = document.querySelector("#errorMessage");

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        todoTask.value === "" ||
        todoDate.value === "" ||
        todoTask.value.length >= 50 ||
        !/^[a-zA-ZåäöÅÄÖ0-9 ]+$/.test(todoTask.value)
    ) {
        errorMessage.textContent = "Täytä kentät oikein! Max. 50 merkkiä!";
        todoTask.classList.add("input-error");
        return;
    }

    todoTask.classList.remove("input-error");
    errorMessage.textContent = "";

    const row = document.createElement("tr");
    const taskCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const buttonCell = document.createElement("td");

    taskCell.textContent = todoTask.value;
    
    // Päivämäärä vaihtuu suomalaiseksi
    const date = new Date(todoDate.value); 
    dateCell.textContent = date.toLocaleDateString("fi-FI");

    // Valmis-nappi
    const completeButton = document.createElement("button");
    completeButton.textContent = "Valmis";
    completeButton.classList.add("complete-Button");

    completeButton.addEventListener("click", function () {
        taskCell.classList.toggle("completed");
        dateCell.classList.toggle("completed");
    });

    // Poista-nappi
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Poista";
    deleteButton.classList.add("delete-Button");

    deleteButton.addEventListener("click", function () {
        row.remove();
    });

    // Napit samaan soluun
    buttonCell.append(completeButton, deleteButton);

    // Solut riville
    row.append(taskCell, dateCell, buttonCell);

    taskTableBody.append(row);
});

const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");
const tulos = document.querySelector("#tulos");

saveButton.addEventListener("click", tallenna);

function tallenna() {
    localStorage.setItem("tasks", taskTableBody.innerHTML);
    tulos.textContent = "Tehtävälistasi on tallennettu!";
}

loadButton.addEventListener("click", hae);

function hae() {
    const data = localStorage.getItem("tasks");

    if (data === null) {
        tulos.textContent = "Ei ole tallennettua tietoa vielä.";
    } else {
        taskTableBody.innerHTML = data;
        tulos.textContent = "Tehtävät ladattu!";
    }
}