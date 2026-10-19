// Haetaan HTML-sivulta tarvittavat elementit
const todoForm = document.querySelector("#todoForm");
const todoTask = document.querySelector("#todoTask");
const todoDate = document.querySelector("#todoDate");
const taskTableBody = document.querySelector("#taskTableBody");
const errorMessage = document.querySelector("#errorMessage");

// Kuunnellaan lomakkeen lähettämistä
todoForm.addEventListener("submit", function (event) {
    // Estetään lomakkeen oletustoiminto eli sivun uudelleenlataus
    event.preventDefault();

    // Tarkistetaan, että kentät on täytetty ja tehtävän nimi
    // täyttää sallitut merkkivaatimukset
    if (
        todoTask.value === "" ||
        todoDate.value === "" ||
        todoTask.value.length >= 50 ||
        !/^[a-zA-ZåäöÅÄÖ0-9 ]+$/.test(todoTask.value)
    ) {
        // Näytetään virheilmoitus ja merkitään tehtäväkenttä virheelliseksi
        errorMessage.textContent = "Täytä kentät oikein! Max. 50 merkkiä!";
        todoTask.classList.add("input-error");
        return; // Keskeytetään tehtävän lisääminen
    }

    // Poistetaan virhemerkintä ja tyhjennetään virheilmoitus
    todoTask.classList.remove("input-error");
    errorMessage.textContent = "";

    // Luodaan uusi taulukkorivi ja kolme solua:
    // tehtävän nimi, päivämäärä ja toimintopainikkeet
    const row = document.createElement("tr");
    const taskCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const buttonCell = document.createElement("td");

    taskCell.textContent = todoTask.value;
    
    // Muutetaan päivämäärä suomalaisen esitystavan mukaiseksi
    const date = new Date(todoDate.value); 
    dateCell.textContent = date.toLocaleDateString("fi-FI");

    // Luodaan Valmis-painike, jolla tehtävä voidaan merkitä suoritetuksi
    const completeButton = document.createElement("button");
    completeButton.textContent = "Valmis";
    completeButton.classList.add("complete-Button");

    // Painikkeen klikkaaminen lisää tai poistaa completed-luokan
    // tehtävän nimestä ja päivämäärästä
    completeButton.addEventListener("click", function () {
        taskCell.classList.toggle("completed");
        dateCell.classList.toggle("completed");
    });

    // Luodaan Poista-painike tehtävän poistamista varten
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Poista";
    deleteButton.classList.add("delete-Button");

    // Painikkeen klikkaaminen poistaa koko tehtävän rivin
    deleteButton.addEventListener("click", function () {
        row.remove();
    });

    // Lisätään molemmat painikkeet samaan taulukon soluun
    buttonCell.append(completeButton, deleteButton);

    // Kootaan tehtävän tiedot ja painikkeet yhdeksi riviksi
    row.append(taskCell, dateCell, buttonCell);

    // Lisätään uusi rivi tehtävätaulukon loppuun
    taskTableBody.append(row);
});

// Haetaan tehtävien tallennus- ja latauspainikkeet
// sekä elementti, jossa näytetään toiminnon palaute
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");
const tulos = document.querySelector("#tulos");

// Liitetään tallennuspainikkeeseen tallenna-funktio
saveButton.addEventListener("click", tallenna);

// Tallennetaan tehtävätaulukon HTML-sisältö selaimen localStorageen
function tallenna() {
    localStorage.setItem("tasks", taskTableBody.innerHTML);
    // Ilmoitetaan käyttäjälle onnistuneesta tallennuksesta
    tulos.textContent = "Tehtävälistasi on tallennettu!";
}

// Liitetään latauspainikkeeseen hae-funktio
loadButton.addEventListener("click", hae);

// Haetaan aiemmin tallennettu tehtävälista localStoragesta
function hae() {
    const data = localStorage.getItem("tasks");

    // Tarkistetaan, löytyykö tallennettua tehtävälistaa
    if (data === null) {
        tulos.textContent = "Ei ole tallennettua tietoa vielä.";
    } else {
        // Palautetaan tallennettu HTML tehtävätaulukkoon
        taskTableBody.innerHTML = data;
        // Ilmoitetaan käyttäjälle, että tehtävät on ladattu
        tulos.textContent = "Tehtävät ladattu!";
    }
}