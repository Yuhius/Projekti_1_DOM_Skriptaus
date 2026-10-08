const todoForm = document.querySelector("#todoForm");
const todoTask = document.querySelector("#todoTask");
const todoDate = document.querySelector("#todoDate");
const taskTableBody = document.querySelector("#taskTableBody");

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        todoTask.value === "" ||
        todoDate.value === "" 
    ) {
        return;
    }

    const row = document.createElement("tr");
    const taskCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const buttonCell = document.createElement("td");

    taskCell.textContent = todoTask.value;
    dateCell.textContent = todoDate.value;

    // Valmis-nappi
    const completeButton = document.createElement("button");
    completeButton.textContent = "Valmis";

    completeButton.addEventListener("click", function () {
        taskCell.classList.toggle("completed");
        dateCell.classList.toggle("completed");
    });

    // Poista-nappi
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Poista";

    deleteButton.addEventListener("click", function () {
        row.remove();
    });

    // Napit samaan soluun
    buttonCell.append(completeButton, deleteButton);

    // Solut riville
    row.append(taskCell, dateCell, buttonCell);

    taskTableBody.append(row);
});